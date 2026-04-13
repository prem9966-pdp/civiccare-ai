import User from "../models/user.model";
import Scheme from "../models/scheme.model";
import Hospital from "../models/hospital.model";
import GeneratedLetter from "../models/letter.model";
import ChatSession from "../models/chat.model";

class AnalyticsService {
  /**
   * Generates a high-level summary for the admin dashboard.
   */
  async getDashboardStats() {
    const [totalUsers, totalSchemes, totalHospitals, totalComplaints, totalChats] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Scheme.countDocuments({}),
      Hospital.countDocuments({}),
      GeneratedLetter.countDocuments({ type: 'Complaint' }),
      ChatSession.countDocuments({})
    ]);

    // Simple trend calculation (Mocked)
    const trends = {
        users: 12, // +12% growth
        schemes: 5,
        hospitals: 2,
        complaints: -8 // -8% drop
    };

    return {
        totalUsers,
        totalSchemes,
        totalHospitals,
        totalComplaints,
        totalChats,
        trends
    };
  }

  /**
   * Analytics breakdown for specific modules.
   */
  async getModuleAnalytics() {
      // Logic for chart data (Usage by day, category breakdown, etc.)
      const categoryBreakdown = await Scheme.aggregate([
          { $group: { _id: "$category", count: { $sum: 1 } } }
      ]);

      return { categoryBreakdown };
  }
}

export const analyticsService = new AnalyticsService();
