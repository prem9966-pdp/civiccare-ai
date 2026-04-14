import mongoose, { Schema, Document } from "mongoose";

export interface IScheme extends Document {
  title: string;
  description: string;
  category: string;
  state: string; // 'Central' or Name of State
  targetGroups: string[];
  benefits: string[];
  requiredDocs: string[];
  stepsToApply: string[];
  officialUrl?: string;
  eligibilityCriteria: {
    minAge?: number;
    maxAge?: number;
    incomeCap?: number;
    gender?: string;
    caste?: string[];
    disabilityRequired?: boolean;
    employment?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const schemeSchema: Schema<IScheme> = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    targetGroups: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    requiredDocs: { type: [String], default: [] },
    stepsToApply: { type: [String], default: [] },
    officialUrl: { type: String },
    eligibilityCriteria: {
      minAge: Number,
      maxAge: Number,
      incomeCap: Number,
      gender: String,
      caste: [String],
      disabilityRequired: Boolean,
      employment: [String],
    },
  },
  { timestamps: true }
);

// Add text index for search
schemeSchema.index({ title: 'text', description: 'text', category: 'text' });

const Scheme = mongoose.model<IScheme>("Scheme", schemeSchema);
export default Scheme;
