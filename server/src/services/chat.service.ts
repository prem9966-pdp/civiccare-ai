import ChatSession, { IChatSession, IMessage } from "../models/chat.model";
import { aiService } from "./ai.service";
import { ApiError } from '../utils/ApiError';

class ChatService {
  async sendMessage(userId: string, content: string, sessionId?: string) {
    if (!userId) throw new ApiError(400, "User ID is required for chat");

    let session: IChatSession | null;

    if (sessionId) {
      session = await ChatSession.findById(sessionId);
    } else {
      session = await ChatSession.create({ 
          userId, 
          title: content.slice(0, 30) + (content.length > 30 ? "..." : "") 
      });
    }

    if (!session) throw new ApiError(404, "Chat session not found");

    // Persist User Message
    const userMsg: any = { sender: 'user', content, timestamp: new Date() };
    session.messages.push(userMsg);

    // Get AI Response
    const aiResult = await aiService.generateResponse(content, session.messages.slice(-10));

    // Persist AI Message
    const aiMsg: any = { 
        sender: 'ai', 
        content: aiResult.content, 
        isEmergency: aiResult.isEmergency, 
        timestamp: new Date() 
    };
    session.messages.push(aiMsg);

    await session.save();
    return { session, aiResponse: aiMsg };
  }

  async getSessions(userId: string) {
    return await ChatSession.find({ userId }).sort({ updatedAt: -1 }).limit(20);
  }

  async getSessionById(userId: string, sessionId: string) {
    const session = await ChatSession.findOne({ _id: sessionId, userId });
    if (!session) throw new ApiError(404, "Conversation not found");
    return session;
  }
}

export const chatService = new ChatService();
