import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  isEmergency?: boolean;
  metadata?: {
    suggestedSchemes?: mongoose.Types.ObjectId[];
  };
}

export interface IChatSession extends Document {
  userId: mongoose.Types.ObjectId;
  messages: IMessage[];
  title?: string;
}

const chatSessionSchema: Schema<IChatSession> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, default: "New Conversation" },
    messages: [
      {
        sender: { type: String, enum: ["user", "ai"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        isEmergency: { type: Boolean, default: false },
        metadata: {
            suggestedSchemes: [{ type: Schema.Types.ObjectId, ref: "Scheme" }]
        }
      },
    ],
  },
  { timestamps: true }
);

const ChatSession = mongoose.model<IChatSession>("ChatSession", chatSessionSchema);
export default ChatSession;
