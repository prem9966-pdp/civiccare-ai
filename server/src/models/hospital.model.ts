import mongoose, { Schema, Document } from "mongoose";

export interface IHospital extends Document {
  name: string;
  type: 'Public' | 'Private' | 'HelpCenter';
  address: string;
  city: string;
  phone: string;
  isEmergencyReady: boolean;
  location: {
    lat: number;
    lng: number;
  };
  services: string[];
  bedAvailability?: number;
}

const hospitalSchema: Schema<IHospital> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['Public', 'Private', 'HelpCenter'], required: true, index: true },
    address: { type: String, required: true },
    city: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    isEmergencyReady: { type: Boolean, default: false },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    services: { type: [String], default: [] },
    bedAvailability: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Geo-spatial index (for future integration)
hospitalSchema.index({ city: 'text', name: 'text' });

const Hospital = mongoose.model<IHospital>("Hospital", hospitalSchema);
export default Hospital;
