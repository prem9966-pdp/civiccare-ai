import ChatSession from "../models/chat.model";
import RecommendationSession from "../models/recommendation.model";
import UploadedDocument from "../models/document.model";

class HistoryService {
  /**
   * Aggregates all user activity into a single chronological timeline.
   */
  async getActivityTimeline(userId: string) {
    const [chats, recommendations, documents] = await Promise.all([
      ChatSession.find({ userId }).sort({ createdAt: -1 }).limit(10),
      RecommendationSession.find({ userId }).sort({ createdAt: -1 }).limit(10),
      UploadedDocument.find({ userId }).sort({ createdAt: -1 }).limit(10)
    ]);

    const timeline = [
      ...chats.map(c => ({
          _id: c._id,
          type: 'chat',
          title: `Consulted Counselor: ${c.title || "Health Assistant"}`,
          date: c.createdAt,
          meta: { messages: c.messages?.length || 0 }
      })),
      ...recommendations.map(r => ({
          _id: r._id,
          type: 'recommendation',
          title: `Matched ${r.matches?.length || 0} schemes for your profile`,
          date: r.createdAt,
          meta: { matches: r.matches?.length || 0 }
      })),
      ...documents.map(d => ({
        _id: d._id,
        type: 'document',
        title: `Uploaded credential: ${d.title}`,
        date: d.createdAt,
        meta: { size: d.fileSize }
      }))
    ];

    // Sort globally by date
    return timeline.sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 30);
  }
}

export const historyService = new HistoryService();
