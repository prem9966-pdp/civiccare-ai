import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

// Standardized Hospital Dataset (Mumbai + Delhi)
const hospitals = [
  // MUMBAI HUBS
  {
    _id: "m1",
    name: "KEM Hospital",
    type: "government",
    city: "Mumbai",
    area: "Parel",
    address: "Acharya Donde Marg, Parel, Mumbai, Maharashtra 400012",
    phone: "022 2410 7000",
    specialty: "Multispeciality, Emergency",
    mapLink: "https://www.google.com/maps/search/KEM+Hospital+Mumbai",
    latitude: 19.0020,
    longitude: 72.8422
  },
  {
    _id: "m2",
    name: "Lilavati Hospital & Research Centre",
    type: "private",
    city: "Mumbai",
    area: "Bandra",
    address: "A-791, Bandra Reclamation Rd, Bandra West, Mumbai, Maharashtra 400050",
    phone: "022 2675 1000",
    specialty: "Cardiology, Oncology",
    mapLink: "https://www.google.com/maps/search/Lilavati+Hospital+Mumbai",
    latitude: 19.0514,
    longitude: 72.8285
  },
  {
    _id: "m3",
    name: "Sir J.J. Group of Hospitals",
    type: "government",
    city: "Mumbai",
    area: "Byculla",
    address: "J J Marg, Nagpada-Mumbai Central, Mumbai, Maharashtra 400008",
    phone: "022 2373 5555",
    specialty: "General Medicine, Surgery",
    mapLink: "https://www.google.com/maps/search/Sir+JJ+Hospital+Mumbai",
    latitude: 18.9634,
    longitude: 72.8335
  },
  {
    _id: "m4",
    name: "Nanavati Max Super Speciality",
    type: "private",
    city: "Mumbai",
    area: "Vile Parle",
    address: "Swami Vivekanand Rd, Vile Parle West, Mumbai, Maharashtra 400056",
    phone: "022 2626 7500",
    specialty: "Critical Care",
    mapLink: "https://www.google.com/maps/search/Nanavati+Hospital+Mumbai",
    latitude: 19.1009,
    longitude: 72.8407
  },
  {
    _id: "m5",
    name: "H. N. Reliance Foundation Hospital",
    type: "private",
    city: "Mumbai",
    area: "Girgaon",
    address: "Prarthana Samaj, Girgaon, Mumbai, Maharashtra 400004",
    phone: "022 6130 5000",
    specialty: "Pediatrics, Cardiology",
    mapLink: "https://www.google.com/maps/search/Reliance+Hospital+Mumbai",
    latitude: 18.9568,
    longitude: 72.8203
  },

  // DELHI HUBS
  {
    _id: "d1",
    name: "AIIMS Delhi",
    type: "government",
    city: "Delhi",
    area: "Ansari Nagar",
    address: "Ansari Nagar, New Delhi, Delhi 110029",
    phone: "011 2658 8500",
    specialty: "Tertiary Care, Research",
    mapLink: "https://www.google.com/maps/search/AIIMS+Delhi",
    latitude: 28.5672,
    longitude: 77.2100
  },
  {
    _id: "d2",
    name: "Max Super Speciality Hospital",
    type: "private",
    city: "Delhi",
    area: "Saket",
    address: "1 & 2, Press Enclave Marg, Saket Institutional Area, New Delhi, Delhi 110017",
    phone: "011 2651 5050",
    specialty: "Neurology, Cardiac Sciences",
    mapLink: "https://www.google.com/maps/search/Max+Hospital+Saket",
    latitude: 28.5284,
    longitude: 77.2117
  },
  {
    _id: "d3",
    name: "Safdarjung Hospital",
    type: "government",
    city: "Delhi",
    area: "Ansari Nagar East",
    address: "Ansari Nagar East, New Delhi, Delhi 110029",
    phone: "011 2670 7444",
    specialty: "Trauma, Maternity",
    mapLink: "https://www.google.com/maps/search/Safdarjung+Hospital+Delhi",
    latitude: 28.5681,
    longitude: 77.2066
  },
  {
    _id: "d4",
    name: "Fortis Escorts Heart Institute",
    type: "private",
    city: "Delhi",
    area: "Okhla",
    address: "Okhla Road, Sukhdev Vihar, New Delhi, Delhi 110025",
    phone: "011 4713 5000",
    specialty: "Heart, Liver",
    mapLink: "https://www.google.com/maps/search/Fortis+Escorts+Delhi",
    latitude: 28.5606,
    longitude: 77.2735
  },
  {
    _id: "d5",
    name: "Ram Manohar Lohia Hospital",
    type: "government",
    city: "Delhi",
    area: "Connaught Place",
    address: "Baba Kharak Singh Rd, nearby Gurudwara Bangla Sahib, Connaught Place, New Delhi 110001",
    phone: "011 2336 5525",
    specialty: "General Medicine",
    mapLink: "https://www.google.com/maps/search/RML+Hospital+Delhi",
    latitude: 28.6254,
    longitude: 77.2023
  }
];

export const listHospitals = asyncHandler(async (req: Request, res: Response) => {
  // CRITICAL: MANDATORY DEBUG LOGS
  console.log("[HOSPITAL BACKEND] Incoming Raw Query:", req.query);

  let cityQuery = (req.query.city || "").toString().toLowerCase().trim();
  const areaQuery = (req.query.area || "").toString().toLowerCase().trim();
  const typeQuery = (req.query.type || "").toString().toLowerCase().trim();

  // Standardize: "New Delhi" should map to "Delhi"
  if (cityQuery.includes("delhi")) cityQuery = "delhi";

  console.log("[HOSPITAL BACKEND] Standardized Query:", { cityQuery, areaQuery, typeQuery });
  console.log("[HOSPITAL BACKEND] Total Dataset size:", hospitals.length);

  const filteredHospitals = hospitals.filter((h) => {
    // 1. City Match (Case-insensitive, Optimized)
    const cityMatch = !cityQuery || h.city.toLowerCase().includes(cityQuery);

    // 2. Area Match (Case-insensitive, Partial Address Support)
    const areaMatch = !areaQuery || 
                     h.area.toLowerCase().includes(areaQuery) || 
                     h.address.toLowerCase().includes(areaQuery);

    // 3. Type Match (All, Government, Private)
    const typeMatch = !typeQuery || 
                     typeQuery === "all" || 
                     h.type.toLowerCase() === typeQuery;

    return cityMatch && areaMatch && typeMatch;
  });

  // MANDATORY DEBUG LOGS
  console.log("[HOSPITAL BACKEND] Filtered Results Count:", filteredHospitals.length);
  if (filteredHospitals.length > 0) {
      console.log("[HOSPITAL BACKEND] Sample matched item:", filteredHospitals[0].name);
  } else {
      console.log("[HOSPITAL BACKEND] WARNING: ZERO RESULTS RETURNED.");
  }

  return res.status(200).json(
    new ApiResponse(200, filteredHospitals, "Hospitals data retrieved successfully")
  );
});

export const getDetails = asyncHandler(async (req: Request, res: Response) => {
  const hospital = hospitals.find(h => h._id === req.params.id) || hospitals[0];

  return res.status(200).json(
    new ApiResponse(200, hospital, "Hospital details retrieved")
  );
});
