import mongoose, { Schema, Document } from "mongoose";

export interface IAdminActivity extends Document {
  adminId: mongoose.Types.ObjectId;
  action: string; // 'CREATE_SCHEME', 'UPDATE_HOSPITAL', 'DELETE_USER'
  targetId: string;
  targetType: string;
  details: string;
}

const adminActivitySchema: Schema<IAdminActivity> = new Schema(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    action: { type: String, required: true },
    targetId: { type: String, required: true },
    targetType: { type: String, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

const AdminActivity = mongoose.model<IAdminActivity>("AdminActivity", adminActivitySchema);
export default AdminActivity;
