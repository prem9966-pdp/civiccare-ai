import mongoose, { Schema, Document } from "mongoose";

export interface IGeneratedLetter extends Document {
  userId: mongoose.Types.ObjectId;
  type: string; // 'Complaint', 'Application', 'Request'
  authority: string; // 'Municipal', 'Police', 'Health Dept'
  subject: string;
  content: string; // HTML or Markdown
  language: string;
  status: 'draft' | 'final';
}

const letterSchema: Schema<IGeneratedLetter> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, required: true },
    authority: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    language: { type: String, default: "English" },
    status: { type: String, enum: ['draft', 'final'], default: 'draft' },
  },
  { timestamps: true }
);

const GeneratedLetter = mongoose.model<IGeneratedLetter>("GeneratedLetter", letterSchema);
export default GeneratedLetter;
