import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

// Standardized Hospital Dataset (Expanded with more cities)
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

  // PUNE HUBS (Adding new data to test location search)
  {
    _id: "p1",
    name: "Noble Hospital",
    type: "private",
    city: "Pune",
    area: "Hadapsar",
    address: "153, Magarpatta City Rd, Hadapsar, Pune, Maharashtra 411013",
    phone: "020 6135 6000",
    specialty: "Multispeciality",
    mapLink: "https://www.google.com/maps/search/Noble+Hospital+Pune",
    latitude: 18.5133,
    longitude: 73.9248
  },
  {
    _id: "p2",
    name: "Sassoon General Hospital",
    type: "government",
    city: "Pune",
    area: "Station Road",
    address: "Jai Prakash Narayan Road, Pune, Maharashtra 411001",
    phone: "020 2612 8000",
    specialty: "General Medicine",
    mapLink: "https://www.google.com/maps/search/Sassoon+Hospital+Pune",
    latitude: 18.5283,
    longitude: 73.8633
  },
  {
    _id: "p3",
    name: "Ruby Hall Clinic",
    type: "private",
    city: "Pune",
    area: "Sassoon Road",
    address: "40, Sassoon Rd, Sangamvadi, Pune, Maharashtra 411001",
    phone: "020 6645 5100",
    specialty: "Cardiology",
    mapLink: "https://www.google.com/maps/search/Ruby+Hall+Clinic+Pune",
    latitude: 18.5323,
    longitude: 73.8748
  },

  // BANGALORE HUBS
  {
    _id: "b1",
    name: "Narayana Health City",
    type: "private",
    city: "Bangalore",
    area: "Bommasandra",
    address: "258/A, Bommasandra Industrial Area, Bangalore, Karnataka 560099",
    phone: "080 6750 6750",
    specialty: "Cardiac Care",
    mapLink: "https://www.google.com/maps/search/Narayana+Health+City+Bangalore",
    latitude: 12.8123,
    longitude: 77.6946
  },
  {
    _id: "b2",
    name: "Victoria Hospital",
    type: "government",
    city: "Bangalore",
    area: "Kalasipalaya",
    address: "Near City Market, Fort, Bangalore, Karnataka 560002",
    phone: "080 2670 1150",
    specialty: "General",
    mapLink: "https://www.google.com/maps/search/Victoria+Hospital+Bangalore",
    latitude: 12.9642,
    longitude: 77.5758
  }
];

export const listHospitals = asyncHandler(async (req: Request, res: Response) => {
  const cityQuery = (req.query.city || "").toString().toLowerCase().trim();
  const areaQuery = (req.query.area || "").toString().toLowerCase().trim();
  const typeQuery = (req.query.type || "").toString().toLowerCase().trim();

  const filteredHospitals = hospitals.filter((h) => {
    // 1. City Match (Support partial match, empty query = all)
    const cityMatch = !cityQuery || h.city.toLowerCase().includes(cityQuery);

    // 2. Area Match
    const areaMatch = !areaQuery || 
                     h.area.toLowerCase().includes(areaQuery) || 
                     h.address.toLowerCase().includes(areaQuery);

    // 3. Type Match
    let typeMatch = true;
    if (typeQuery && typeQuery !== "all") {
        if (typeQuery === "public") {
            typeMatch = h.type.toLowerCase() === "government";
        } else if (typeQuery === "private") {
            typeMatch = h.type.toLowerCase() === "private";
        } else {
            typeMatch = h.type.toLowerCase() === typeQuery;
        }
    }

    return cityMatch && areaMatch && typeMatch;
  });

  return res.status(200).json(
    new ApiResponse(200, filteredHospitals, "Hospitals data retrieved successfully")
  );
});

export const getDetails = asyncHandler(async (req: Request, res: Response) => {
  const hospital = hospitals.find(h => h._id === req.params.id);

  if (!hospital) {
    return res.status(404).json(new ApiResponse(404, null, "Hospital not found"));
  }

  return res.status(200).json(
    new ApiResponse(200, hospital, "Hospital details retrieved")
  );
});
