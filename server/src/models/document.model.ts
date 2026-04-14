import mongoose, { Schema, Document } from "mongoose";

export interface IUploadedDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  type: string; // 'Aadhar', 'PAN', 'Income', 'Other'
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const uploadedDocumentSchema: Schema<IUploadedDocument> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    type: { type: String, required: true, index: true },
    originalName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, required: true },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const UploadedDocument = mongoose.model<IUploadedDocument>("UploadedDocument", uploadedDocumentSchema);
export default UploadedDocument;
