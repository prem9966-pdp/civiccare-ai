import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import Scheme from '../models/scheme.model';
import Hospital from '../models/hospital.model';
import { ENV } from '../config/env';

const demoUsers = [
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    password: "password123",
    role: "user",
    profile: {
      location: "Delhi",
      city: "New Delhi",
      age: 32,
      occupation: "Farmer",
      category: "General",
      incomeRange: "Below 3L",
      healthIssues: ["None"]
    }
  },
  {
    name: "Priya Patel",
    email: "priya@example.com",
    password: "password123",
    role: "user",
    profile: {
      location: "Mumbai",
      city: "Mumbai",
      age: 28,
      occupation: "Healthcare Worker",
      category: "OBC",
      incomeRange: "3L - 8L",
      healthIssues: ["Diabetes"]
    }
  },
  {
    name: "CivicCare Admin",
    email: "admin@civiccare.ai",
    password: "adminpassword",
    role: "admin"
  }
];

const schemes = [
  {
    title: "PM-JAY (Ayushman Bharat)",
    description: "Health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization to over 10.74 crores poor and vulnerable families.",
    category: "Health",
    benefits: ["5L Health Cover", "Cashless Treatment", "Universal Access"],
    eligibility: {
      incomeLimit: 500000,
      targetGroups: ["Rural Households", "Urban Occupational Categories"],
      minAge: 0,
      maxAge: 100,
      state: "All"
    },
    requiredDocs: ["Aadhar Card", "Ration Card", "Income Certificate"],
    applicationSteps: ["Visit empanelled hospital", "Verify Identity", "Get treated cashless"]
  },
  {
      title: "PM-Kisan Samman Nidhi",
      description: "Direct income support of Rs. 6,000 per year to all landholding farmer families.",
      category: "Agriculture",
      benefits: ["Rs. 6000 Yearly", "Direct Bank Transfer"],
      eligibility: {
        incomeLimit: 999999,
        targetGroups: ["Small and Marginal Farmers"],
        minAge: 18,
        maxAge: 100,
        state: "All"
      },
      requiredDocs: ["Aadhar Card", "Land Records", "Bank Account Details"],
      applicationSteps: ["Register on PM-Kisan portal", "Self-verify", "Fund transfer"]
  }
];

const hospitals = [
    {
      name: "AIIMS New Delhi",
      type: "Public",
      address: "Ansari Nagar, New Delhi",
      city: "Delhi",
      phone: "011-26588500",
      isEmergencyReady: true,
      location: { lat: 28.5672, lng: 77.2100 },
      services: ["General Surgery", "Cardiology", "Neurology"],
      bedAvailability: 150
    },
    {
      name: "Mumbai Civic Help Center - Ward A",
      type: "HelpCenter",
      address: "Fort, Mumbai",
      city: "Mumbai",
      phone: "022-22620251",
      isEmergencyReady: false,
      location: { lat: 18.9401, lng: 72.8347 },
      services: ["Scheme Assistance", "Complaint Filing"],
      bedAvailability: 0
    }
];

const seedMaster = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to DB for Master Seeding...");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Scheme.deleteMany({}),
      Hospital.deleteMany({})
    ]);

    // Hash passwords and seed users
    const hashedUsers = await Promise.all(demoUsers.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10)
    })));
    await User.insertMany(hashedUsers);
    console.log(`✅ Seeded ${hashedUsers.length} Users (Demo & Admin)`);

    // Seed schemes and hospitals
    await Scheme.insertMany(schemes);
    console.log(`✅ Seeded ${schemes.length} Schemes`);

    await Hospital.insertMany(hospitals);
    console.log(`✅ Seeded ${hospitals.length} Proximity Locations`);

    console.log("\n🚀 CivicCare AI Master Seeding Complete!");
    console.log("Demo Citizen: aarav@example.com / password123");
    console.log("Demo Admin: admin@civiccare.ai / adminpassword");

    process.exit(0);
  } catch (error) {
    console.error("❌ Master Seeding Failed:", error);
    process.exit(1);
  }
};

seedMaster();
