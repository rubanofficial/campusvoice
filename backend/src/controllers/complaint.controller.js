import Complaint from "../models/Complaint.model.js";
import {
    analyzeComplaint,
    FALLBACK_ANALYSIS,
} from "../services/geminiService.js";

// Generate unique complaint ID
function generateComplaintId() {
    return `GRV-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;
}

// CREATE complaint (public)
export const createComplaint = async (req, res) => {
    try {
        let analysis = { ...FALLBACK_ANALYSIS };
        let analysisMeta = {
            source: "fallback",
            reason: "unknown",
            confidence: 0.35,
        };

        try {
            const aiResult = await analyzeComplaint(req.body.complaintText);
            analysis = aiResult.analysis;
            analysisMeta = aiResult.meta;
        } catch (error) {
            console.error("AI analysis error. Using fallback.", error);
        }

        console.info(
            `[AI] source=${analysisMeta.source}, priority=${analysis.priority}, sentiment=${analysis.sentiment}`
        );

        const complaint = await Complaint.create({
            ...req.body,
            complaintId: generateComplaintId(),
            status: "submitted",
            mlOutput: {
                category: req.body.category,
                priority: analysis.priority,
                sentiment: analysis.sentiment,
                keywords: analysis.keywords,
                flags: {
                    urgent: analysis.priority === "critical",
                    safety: req.body.category === "safety",
                    duplicate: false,
                },
                confidence: analysisMeta.confidence,
            },
        });

        res.status(201).json({
            success: true,
            complaintId: complaint.complaintId,
            analysis,
            analysisMeta,
        });
    } catch (error) {
        console.error("Create complaint error:", error);
        res.status(500).json({ message: "Failed to submit complaint" });
    }
};

// GET complaint by ID (public tracking)
export const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findOne({
            complaintId: req.params.complaintId,
        });

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: "Error fetching complaint" });
    }
};

// ✅ GET ALL complaints (ADMIN) - Returns full complaint data for dashboard
export const getAllComplaints = async (req, res) => {
    try {
        const { status, category, priority, page = 1, limit = 10 } = req.query;

        // Build filter object
        const filter = {};
        if (status && status !== "all") filter.status = status;
        if (category && category !== "all") filter.category = category;
        if (priority && priority !== "all") {
            filter["mlOutput.priority"] = priority;
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch complaints with filters and pagination
        const complaints = await Complaint.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Complaint.countDocuments(filter);

        res.json({
            complaints,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / parseInt(limit)),
        });
    } catch (error) {
        console.error("Get all complaints error:", error);
        res.status(500).json({ message: "Failed to fetch complaints" });
    }
};

// UPDATE complaint status (ADMIN)
export const updateComplaintStatus = async (req, res) => {
    try {
        const { status, adminRemarks, updatedBy } = req.body;

        const complaint = await Complaint.findOneAndUpdate(
            { complaintId: req.params.complaintId },
            {
                status,
                adminRemarks,
                updatedBy,
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.json({ success: true, complaint });
    } catch (error) {
        console.error("Update complaint error:", error);
        res.status(500).json({ message: "Failed to update complaint" });
    }
};

// ✅ GET ADVANCED ANALYTICS (ADMIN)
export const getAnalytics = async (req, res) => {
    try {
        const complaints = await Complaint.find();

        // Status breakdown
        const statusBreakdown = {
            submitted: 0,
            in_review: 0,
            resolved: 0,
            rejected: 0,
        };

        // Category breakdown
        const categoryBreakdown = {};

        // Priority breakdown
        const priorityBreakdown = {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
        };

        // Time metrics
        let totalResolutionTime = 0;
        let resolvedCount = 0;

        // Trend data (last 7 days)
        const last7Days = new Array(7).fill(0);

        complaints.forEach((complaint) => {
            // Status
            if (statusBreakdown[complaint.status] !== undefined) {
                statusBreakdown[complaint.status]++;
            }

            // Category
            if (complaint.category) {
                categoryBreakdown[complaint.category] =
                    (categoryBreakdown[complaint.category] || 0) + 1;
            }

            // Priority
            if (complaint.mlOutput?.priority) {
                if (priorityBreakdown[complaint.mlOutput.priority] !== undefined) {
                    priorityBreakdown[complaint.mlOutput.priority]++;
                }
            }

            // Resolution time
            if (complaint.status === "resolved" && complaint.updatedAt) {
                const resolutionTime =
                    (new Date(complaint.updatedAt) - new Date(complaint.createdAt)) /
                    (1000 * 60 * 60); // in hours
                totalResolutionTime += resolutionTime;
                resolvedCount++;
            }

            // Trend (last 7 days)
            const createdDate = new Date(complaint.createdAt);
            const dayDiff = Math.floor(
                (new Date() - createdDate) / (1000 * 60 * 60 * 24)
            );
            if (dayDiff < 7) {
                last7Days[6 - dayDiff]++;
            }
        });

        // Calculate average resolution time
        const avgResolutionTime =
            resolvedCount > 0 ? Math.round(totalResolutionTime / resolvedCount) : 0;

        // Convert categoryBreakdown to array
        const categoryArray = Object.entries(categoryBreakdown).map(
            ([category, count]) => ({
                category,
                count,
            })
        );

        res.json({
            totalComplaints: complaints.length,
            statusBreakdown,
            categoryBreakdown: categoryArray,
            priorityBreakdown,
            avgResolutionTime,
            resolvedCount,
            anonymousCount: complaints.filter((c) => c.isAnonymous).length,
            identifiedCount: complaints.filter((c) => !c.isAnonymous).length,
            trendData: last7Days,
            safetyRelatedCount: complaints.filter(
                (c) => c.category === "safety"
            ).length,
            highPriorityCount: complaints.filter(
                (c) =>
                    c.mlOutput?.priority === "high" ||
                    c.mlOutput?.priority === "critical"
            ).length,
        });
    } catch (error) {
        console.error("Get analytics error:", error);
        res.status(500).json({ message: "Failed to fetch analytics" });
    }
};
