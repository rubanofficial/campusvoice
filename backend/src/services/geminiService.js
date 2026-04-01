const FALLBACK_ANALYSIS = {
    sentiment: "neutral",
    priority: "medium",
    keywords: [],
};

const ALLOWED_SENTIMENTS = new Set(["positive", "neutral", "negative"]);
const ALLOWED_PRIORITIES = new Set(["low", "medium", "high", "critical"]);

let GeminiSdkClass = null;

const DEFAULT_MODEL_CANDIDATES = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
];

function getModelCandidates() {
    const fromEnv = String(process.env.GEMINI_MODEL || "").trim();
    const allCandidates = fromEnv
        ? [fromEnv, ...DEFAULT_MODEL_CANDIDATES]
        : [...DEFAULT_MODEL_CANDIDATES];

    // Remove duplicates while preserving order.
    return [...new Set(allCandidates)];
}

async function getGeminiSdk() {
    if (GeminiSdkClass) return GeminiSdkClass;

    try {
        const sdk = await import("@google/generative-ai");
        GeminiSdkClass = sdk.GoogleGenerativeAI;
        return GeminiSdkClass;
    } catch (error) {
        console.error(
            "Gemini SDK not available. Run: npm install @google/generative-ai",
            error
        );
        return null;
    }
}

function extractJsonObject(rawText = "") {
    const trimmed = rawText.trim();

    // Gemini can occasionally wrap JSON in markdown fences.
    const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const candidate = fencedMatch ? fencedMatch[1].trim() : trimmed;

    // Try direct parse first.
    try {
        return JSON.parse(candidate);
    } catch {
        // Fallback: parse the first object-like block.
        const objectMatch = candidate.match(/\{[\s\S]*\}/);
        if (!objectMatch) {
            throw new Error("No JSON object found in Gemini response");
        }
        return JSON.parse(objectMatch[0]);
    }
}

function sanitizeAnalysis(parsed) {
    const sentiment = String(parsed?.sentiment || "").toLowerCase();
    const priority = String(parsed?.priority || "").toLowerCase();

    const keywords = Array.isArray(parsed?.keywords)
        ? parsed.keywords
            .map((item) => String(item).trim().toLowerCase())
            .filter(Boolean)
            .slice(0, 10)
        : [];

    return {
        sentiment: ALLOWED_SENTIMENTS.has(sentiment)
            ? sentiment
            : FALLBACK_ANALYSIS.sentiment,
        priority: ALLOWED_PRIORITIES.has(priority)
            ? priority
            : FALLBACK_ANALYSIS.priority,
        keywords,
    };
}

function sanitizeConfidence(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 0.5;
    return Math.max(0, Math.min(1, numeric));
}

function buildPrompt(complaintText) {
    return `You are an AI assistant for a Smart Complaint Management System.

Analyze the complaint text and classify it into:
1) sentiment: one of [positive, neutral, negative]
2) priority: one of [low, medium, high, critical]
3) keywords: array of 3 to 8 short relevant keywords
4) confidence: number between 0 and 1 for how confident you are in this classification

Rules:
- Use only the allowed enum values exactly as specified.
- Return strict JSON only (no markdown, no explanation, no extra text).
- Output must follow this exact schema:
{
  "sentiment": "negative",
  "priority": "high",
    "keywords": ["hostel", "maintenance"],
    "confidence": 0.87
}

Complaint text:
"""
${complaintText}
"""`;
}

function parseRetryDelaySeconds(errorDetails = []) {
    const retryInfo = errorDetails.find(
        (item) => item?.["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
    );

    const retryDelay = retryInfo?.retryDelay;
    if (!retryDelay || typeof retryDelay !== "string") return null;

    const seconds = Number.parseInt(retryDelay.replace(/s$/i, ""), 10);
    return Number.isFinite(seconds) ? seconds : null;
}

function getFallbackMetaFromError(error) {
    const status = error?.status;
    const errorDetails = Array.isArray(error?.errorDetails) ? error.errorDetails : [];
    const retryAfterSeconds = parseRetryDelaySeconds(errorDetails);

    if (status === 429) {
        return {
            source: "fallback",
            reason: "quota_exceeded",
            confidence: 0.35,
            retryAfterSeconds,
        };
    }

    if (status === 404 || status === 400) {
        return {
            source: "fallback",
            reason: "no_supported_model",
            confidence: 0.35,
        };
    }

    return {
        source: "fallback",
        reason: "api_or_parse_failure",
        confidence: 0.35,
    };
}

export async function analyzeComplaint(text) {
    if (!text || typeof text !== "string") {
        return {
            analysis: { ...FALLBACK_ANALYSIS },
            meta: {
                source: "fallback",
                reason: "invalid_text",
                confidence: 0.35,
            },
        };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("GEMINI_API_KEY not found. Using fallback analysis.");
        return {
            analysis: { ...FALLBACK_ANALYSIS },
            meta: {
                source: "fallback",
                reason: "missing_api_key",
                confidence: 0.35,
            },
        };
    }

    try {
        const GoogleGenerativeAI = await getGeminiSdk();
        if (!GoogleGenerativeAI) {
            return {
                analysis: { ...FALLBACK_ANALYSIS },
                meta: {
                    source: "fallback",
                    reason: "sdk_not_installed",
                    confidence: 0.35,
                },
            };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const modelCandidates = getModelCandidates();
        let lastError = null;

        for (const modelName of modelCandidates) {
            try {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    generationConfig: {
                        temperature: 0.1,
                        responseMimeType: "application/json",
                    },
                });

                const result = await model.generateContent(buildPrompt(text));
                const raw = result?.response?.text?.() || "";
                const parsed = extractJsonObject(raw);

                return {
                    analysis: sanitizeAnalysis(parsed),
                    meta: {
                        source: "gemini",
                        model: modelName,
                        confidence: sanitizeConfidence(parsed?.confidence),
                    },
                };
            } catch (error) {
                lastError = error;
                const status = error?.status;

                // Try next model if current one is unavailable.
                if (status === 404 || status === 400 || status === 429) {
                    continue;
                }

                throw error;
            }
        }

        console.error(
            "Gemini analysis failed. No compatible model found.",
            lastError
        );
        return {
            analysis: { ...FALLBACK_ANALYSIS },
            meta: getFallbackMetaFromError(lastError),
        };
    } catch (error) {
        console.error("Gemini analysis failed. Using fallback analysis.", error);
        return {
            analysis: { ...FALLBACK_ANALYSIS },
            meta: getFallbackMetaFromError(error),
        };
    }
}

export { FALLBACK_ANALYSIS };