import mongoose, { Schema, Document } from "mongoose";

export interface IGeneratedLetter extends Document {
  userId: mongoose.Types.ObjectId;
  category: string; // 'Complaint', 'Application', 'Request'
  addressTo: string; // 'Municipal', 'Police', 'Health Dept'
  title: string;
  description: string; // Original user input
  content: string; // AI Generated content
  language: string;
  status: 'draft' | 'final';
  createdAt: Date;
  updatedAt: Date;
}

const letterSchema: Schema<IGeneratedLetter> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    category: { type: String, required: true },
    addressTo: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    language: { type: String, default: "English" },
    status: { type: String, enum: ['draft', 'final'], default: 'draft' },
  },
  { timestamps: true }
);

const GeneratedLetter = mongoose.model<IGeneratedLetter>("GeneratedLetter", letterSchema);
export default GeneratedLetter;
