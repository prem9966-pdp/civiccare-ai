import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

interface RecommendationRequest {
  age: number;
  gender: string;
  state: string;
  income: number;
  category: string;
  occupation: string;
}

export const getRecommendations = asyncHandler(async (req: Request, res: Response) => {
  const { age, gender, state, income, category, occupation }: RecommendationRequest = req.body;

  const recommendations = [];

  // Rule 1: PM Awas Yojana (Low Income)
  if (income < 300000) {
    recommendations.push({
      name: "PM Awas Yojana (Urban/Gramin)",
      description: "Financial assistance for housing for low-income and middle-income families.",
      eligibilityReason: `Your reported income of ₹${income} falls within the eligible range for affordable housing support.`
    });
  }

  // Rule 2: National Scholarship Portal (Students)
  if (occupation?.toLowerCase() === "student") {
    recommendations.push({
      name: "National Scholarship Scheme",
      description: "Scholarship opportunities for students from Class 9 to Post-Graduation.",
      eligibilityReason: "Identification as a student makes you eligible for various central scholarship programs."
    });
  }

  // Rule 3: PM Kisan Samman Nidhi (Farmers)
  if (occupation?.toLowerCase() === "farmer") {
    recommendations.push({
      name: "PM Kisan Samman Nidhi",
      description: "Direct income support of ₹6,000 per year in three installments.",
      eligibilityReason: "Identification as a farmer qualifies you for direct income support for agricultural activities."
    });
  }

  // Rule 4: Mahila Samman Savings Certificate (Female)
  if (gender?.toLowerCase() === "female") {
    recommendations.push({
      name: "Mahila Samman Savings Certificate",
      description: "A small savings scheme for women and girls with attractive interest rates.",
      eligibilityReason: "Gender-specific financial inclusion program designed for women's empowerment."
    });
  }

  // Rule 5: Indira Gandhi National Old Age Pension Scheme (Senior Citizens)
  if (age >= 60) {
    recommendations.push({
      name: "National Old Age Pension Scheme",
      description: "Monthly pension for citizens above 60 living under the poverty line.",
      eligibilityReason: `At age ${age}, you qualify as a senior citizen for various social security pensions.`
    });
  }

  // Rule 6: PM Garib Kalyan Anna Yojana (Low Income + Specific Category)
  if (income < 200000 || category?.toLowerCase() === "sc" || category?.toLowerCase() === "st") {
     recommendations.push({
      name: "PM Garib Kalyan Anna Yojana",
      description: "Distribution of free food grains to eligible households under National Food Security Act.",
      eligibilityReason: "Eligibility based on income threshold or affirmative action category."
    });
  }

  // Rule 7: Skill India - PM Kaushal Vikas Yojana (Unemployed/Youth)
  if (occupation?.toLowerCase() === "unemployed" || (age >= 18 && age <= 35)) {
    recommendations.push({
        name: "Pradhan Mantri Kaushal Vikas Yojana",
        description: "Skill certification scheme to enable youth to take up industry-relevant skill training.",
        eligibilityReason: "Youth-focused skill development program for employment readiness."
    });
  }


  return res.status(200).json(
    new ApiResponse(200, recommendations, "Recommendations generated successfully")
  );
});
