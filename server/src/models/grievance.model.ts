import mongoose, { Schema, Document } from "mongoose";

export interface IGrievance extends Document {
  title: string;
  category: string;
  department: string;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const grievanceSchema: Schema<IGrievance> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'resolved', 'rejected'], 
      default: 'pending' 
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

// Indexes
grievanceSchema.index({ user: 1, createdAt: -1 });

const Grievance = mongoose.model<IGrievance>("Grievance", grievanceSchema);
export default Grievance;
