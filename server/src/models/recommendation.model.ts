import mongoose, { Schema, Document } from "mongoose";

export interface IRecommendationSession extends Document {
  userId: mongoose.Types.ObjectId;
  recommendations: {
    schemeId: mongoose.Types.ObjectId;
    score: number;
    matchedCriteria: string[];
    missingCriteria: string[];
  }[];
  timestamp: Date;
}

const recommendationSessionSchema: Schema<IRecommendationSession> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    recommendations: [
      {
        schemeId: { type: Schema.Types.ObjectId, ref: "Scheme", required: true },
        score: { type: Number, required: true },
        matchedCriteria: [String],
        missingCriteria: [String],
      },
    ],
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const RecommendationSession = mongoose.model<IRecommendationSession>(
  "RecommendationSession",
  recommendationSessionSchema
);

export default RecommendationSession;
