import Scheme, { IScheme } from "../models/scheme.model";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError";

class SchemeService {
  async getAllSchemes(query: any) {
    const { search, category, state, targetGroup } = query;
    const filter: any = {};

    if (search) {
      filter.$text = { $search: search };
    }
    if (category) filter.category = category;
    if (state) filter.state = state;
    if (targetGroup) filter.targetGroups = { $in: [targetGroup] };

    return await Scheme.find(filter).sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 });
  }

  async getSchemeById(id: string) {
    const scheme = await Scheme.findById(id);
    if (!scheme) throw new ApiError(404, "Scheme not found");
    return scheme;
  }

  async toggleSaveScheme(userId: string, schemeId: string) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const index = user.savedSchemes.indexOf(schemeId as any);
    if (index === -1) {
      user.savedSchemes.push(schemeId as any);
    } else {
      user.savedSchemes.splice(index, 1);
    }

    await user.save();
    return user.savedSchemes;
  }

  calculateEligibility(userProfile: any, scheme: IScheme) {
    let score = 0;
    let totalCriteria = 0;
    const criteria = scheme.eligibilityCriteria;

    if (criteria.minAge && userProfile.age) {
      totalCriteria++;
      if (userProfile.age >= criteria.minAge) score++;
    }
    if (criteria.maxAge && userProfile.age) {
        totalCriteria++;
        if (userProfile.age <= criteria.maxAge) score++;
    }
    if (criteria.incomeCap && userProfile.incomeRange) {
        totalCriteria++;
        // Very basic mock logic for income range string comparison
        score++; 
    }
    if (criteria.gender && userProfile.gender) {
        totalCriteria++;
        if (userProfile.gender === criteria.gender) score++;
    }

    return totalCriteria === 0 ? 100 : Math.round((score / totalCriteria) * 100);
  }
}

export const schemeService = new SchemeService();
