import mongoose from 'mongoose';
import Hospital from '../models/hospital.model';
import { ENV } from '../config/env';

const hospitals = [
  {
    name: "AIIMS New Delhi",
    type: "Public",
    address: "Ansari Nagar, New Delhi",
    city: "Delhi",
    phone: "011-26588500",
    isEmergencyReady: true,
    location: { lat: 28.5672, lng: 77.2100 },
    services: ["General Surgery", "Cardiology", "Neurology", "Trauma Care"],
    bedAvailability: 150
  },
  {
    name: "Fortis Hospital, Bangalore",
    type: "Private",
    address: "Bannerghatta Main Rd, Bangalore",
    city: "Bangalore",
    phone: "080-66214444",
    isEmergencyReady: true,
    location: { lat: 12.8943, lng: 77.5979 },
    services: ["Emergency Medicine", "Orthopedics", "Oncology"],
    bedAvailability: 45
  },
  {
    name: "Mumbai Civic Help Center - Zone 1",
    type: "HelpCenter",
    address: "CST Station Area, Mumbai",
    city: "Mumbai",
    phone: "022-22620251",
    isEmergencyReady: false,
    location: { lat: 18.9401, lng: 72.8347 },
    services: ["Scheme Assistance", "Complaint Filing", "Aadhar Sync"],
    bedAvailability: 0
  },
  {
      name: "Victoria Hospital",
      type: "Public",
      address: "Near Kalasipalya, Bangalore",
      city: "Bangalore",
      phone: "080-26701150",
      isEmergencyReady: true,
      location: { lat: 12.9634, lng: 77.5755 },
      services: ["Burn Center", "General Ward", "Dialysis"],
      bedAvailability: 200
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to DB for seeding locations...");
    
    await Hospital.deleteMany({});
    console.log("Cleared existing locations.");
    
    await Hospital.insertMany(hospitals);
    console.log("Successfully seeded India-focused hospitals!");
    
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
