import { API_BASE } from "Constants";

const AdminDashboardService = {
  async fetchMetrics() {
    try {
      const response = await fetch(`${API_BASE}/admin/metrics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error("Failed to fetch admin metrics");
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch admin metrics:", error);
      throw error;
    }
  }
};

export default AdminDashboardService;
