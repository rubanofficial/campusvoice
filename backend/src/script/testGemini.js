import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { analyzeComplaint } from "../services/geminiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const sampleText =
    process.argv.slice(2).join(" ") ||
    "Hostel room has leaking water pipe and no one fixed it for two weeks.";

async function run() {
    const result = await analyzeComplaint(sampleText);

    console.log("Sample complaint:", sampleText);
    console.log("\nAnalysis result:");
    console.log(JSON.stringify(result, null, 2));
}

run().catch((error) => {
    console.error("Gemini test failed:", error);
    process.exit(1);
});