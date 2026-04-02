const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_BASE = `${API_BASE_URL}/complaints`;

export const complaintService = {
  // Submit complaint
  async submitComplaint(data) {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to submit complaint");
    }

    return res.json();
  },

  // Track complaint by ID
  async trackComplaint(complaintId) {
    const res = await fetch(`${API_BASE}/${complaintId}`);

    if (!res.ok) {
      return null;
    }

    return res.json();
  },

  // Admin: get all complaints
  async getAllComplaints(filters = {}) {
    // Build query parameters from filters object
    const params = new URLSearchParams();

    if (filters.status && filters.status !== "all") {
      params.append("status", filters.status);
    }
    if (filters.category && filters.category !== "all") {
      params.append("category", filters.category);
    }
    if (filters.priority && filters.priority !== "all") {
      params.append("priority", filters.priority);
    }
    if (filters.page) {
      params.append("page", filters.page);
    }
    if (filters.limit) {
      params.append("limit", filters.limit);
    }

    const url = `${API_BASE}${params.toString() ? "?" + params.toString() : ""}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch complaints");
    }

    return res.json();
  },

  // Admin: get single complaint
  async getComplaint(complaintId) {
    const res = await fetch(`${API_BASE}/${complaintId}`);

    if (!res.ok) return null;

    return res.json();
  },

  // Admin: update status
  async updateComplaintStatus(complaintId, payload) {
    const res = await fetch(`${API_BASE}/${complaintId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update complaint");
    }

    return res.json();
  },

  // Admin: get dashboard metrics
  async getDashboardMetrics() {
    try {
      const res = await fetch(`${API_BASE}/analytics`);

      if (!res.ok) {
        throw new Error("Failed to fetch analytics");
      }

      return res.json();
    } catch (e) {
      console.error("Failed to fetch dashboard metrics:", e);
      throw e;
    }
  },
};
