import mongoose, { Schema, Document } from "mongoose";

export interface IRecommendationSession extends Document {
  userId: mongoose.Types.ObjectId;
  matches: {
    schemeId: mongoose.Types.ObjectId;
    score: number;
    matchedCriteria: string[];
    missingCriteria: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const recommendationSessionSchema: Schema<IRecommendationSession> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    matches: [
      {
        schemeId: { type: Schema.Types.ObjectId, ref: "Scheme", required: true },
        score: { type: Number, required: true },
        matchedCriteria: [String],
        missingCriteria: [String],
      },
    ],
  },
  { timestamps: true }
);

const RecommendationSession = mongoose.model<IRecommendationSession>(
  "RecommendationSession",
  recommendationSessionSchema
);

export default RecommendationSession;
