import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scheme from '../models/scheme.model';
import { ENV } from '../config/env';

const schemes = [
  {
    title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    description: "National Mission for Financial Inclusion to ensure access to financial services, namely, basic savings & deposit accounts, remittance, credit, insurance, pension in an affordable manner.",
    category: "Financial Inclusion",
    state: "Central",
    targetGroups: ["Below Poverty Line", "Rural Citizens", "Unorganized Workers"],
    benefits: [
      "Interest on deposit",
      "Accidental insurance cover of Rs. 2 lakhs",
      "No minimum balance required",
      "Overdraft facility up to Rs. 10,000"
    ],
    requiredDocs: ["Aadhar Card", "PAN Card (Optional)", "Voter ID", "Passport Size Photo"],
    stepsToApply: [
      "Visit any bank branch or Business Correspondent (Bank Mitr) outlet",
      "Fill the PMJDY account opening form",
      "Submit required KYC documents",
      "Get your RuPay Debit Card"
    ],
    eligibilityCriteria: {
      minAge: 10,
      incomeCap: 200000,
      employment: ["Self-employed", "Unemployed"]
    }
  },
  {
    title: "Ayushman Bharat (PM-JAY)",
    description: "The world's largest health assurance scheme, aiming to provide a health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization.",
    category: "Healthcare",
    state: "Central",
    targetGroups: ["Low Income Families", "Rural Population", "Urban Workers"],
    benefits: [
      "Cashless treatment at public and empanelled private hospitals",
      "Coverage for 3 days of pre-hospitalization and 15 days post-hospitalization",
      "All pre-existing conditions covered from day one"
    ],
    requiredDocs: ["Aadhar Card", "Ration Card", "PM Letter (if available)"],
    stepsToApply: [
      "Check eligibility on the official PM-JAY website",
      "Visit the nearest empanelled hospital or Common Service Centre (CSC)",
      "Get your Ayushman Card issued",
      "Present the card at the hospital for cashless treatment"
    ],
    eligibilityCriteria: {
      incomeCap: 120000,
      disabilityRequired: false
    }
  },
  {
    title: "PM-Kisan Samman Nidhi",
    description: "An initiative by the government of India in which all farmers will get up to ₹6,000 per year as minimum income support.",
    category: "Agriculture",
    state: "Central",
    targetGroups: ["Small and Marginal Farmers"],
    benefits: ["Direct income support of ₹6,000 per year in three installments"],
    requiredDocs: ["Landholding papers", "Aadhar Card", "Bank Account Details"],
    stepsToApply: [
      "Register on the PM-Kisan portal",
      "Fill the self-registration form",
      "Upload land documents",
      "Wait for verification by state authorities"
    ],
    eligibilityCriteria: {
      employment: ["Farmer"]
    }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to DB for seeding...");
    
    await Scheme.deleteMany({});
    console.log("Cleared existing schemes.");
    
    await Scheme.insertMany(schemes);
    console.log("Successfully seeded India-focused schemes!");
    
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
