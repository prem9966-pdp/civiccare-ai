import Scheme, { IScheme } from "../models/scheme.model";
import RecommendationSession from "../models/recommendation.model";
import { IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

class RecommendationService {
  /**
   * Generates a ranked list of schemes for the user based on their profile.
   */
  async generateRecommendations(user: IUser) {
    const schemes = await Scheme.find({});
    const profile = user.profile;

    const results = schemes.map((scheme) => {
      const { score, matched, missing } = this.calculateMatchScore(profile, scheme);
      return { 
        schemeId: scheme._id, 
        score, 
        schemeDetails: scheme,
        matchedCriteria: matched,
        missingCriteria: missing 
      };
    });

    // Rank by score descending
    const rankedResults = results.sort((a, b) => b.score - a.score).filter(r => r.score > 0);

    // Persist session if user is logged in
    if (user._id) {
       await RecommendationSession.create({
         userId: user._id,
         matches: rankedResults.map(r => ({
             schemeId: r.schemeId,
             score: r.score,
             matchedCriteria: r.matchedCriteria,
             missingCriteria: r.missingCriteria
         }))
       });
    }

    return rankedResults;
  }

  /**
   * Explains the matching logic for a single scheme against a user profile.
   */
  private calculateMatchScore(profile: any, scheme: IScheme) {
    let score = 0;
    let totalCriteria = 0;
    const matched: string[] = [];
    const missing: string[] = [];
    const crit = scheme.eligibilityCriteria;

    // 1. Geography (Primary Filter)
    if (scheme.state !== 'Central') {
        totalCriteria++;
        if (profile.state === scheme.state) {
            score++;
            matched.push("State Match");
        } else {
            missing.push(`Requires residency in ${scheme.state}`);
        }
    }

    // 2. Age
    if (crit.minAge) {
      totalCriteria++;
      if (profile.age && profile.age >= crit.minAge) {
        score++;
        matched.push(`At least ${crit.minAge} years old`);
      } else {
        missing.push(`Minimum age required: ${crit.minAge}`);
      }
    }
    if (crit.maxAge) {
        totalCriteria++;
        if (profile.age && profile.age <= crit.maxAge) {
            score++;
            matched.push(`Under ${crit.maxAge} years old`);
        } else {
            missing.push(`Maximum age limit: ${crit.maxAge}`);
        }
    }

    // 3. Occupation / Employment
    if (crit.employment && crit.employment.length > 0) {
        totalCriteria++;
        if (profile.occupation && crit.employment.includes(profile.occupation)) {
            score++;
            matched.push(`Occupation Matches: ${profile.occupation}`);
        } else {
            missing.push(`Requires occupation in: ${crit.employment.join(', ')}`);
        }
    }

    // 4. Caste / Category
    if (crit.caste && crit.caste.length > 0) {
        totalCriteria++;
        if (profile.category && crit.caste.includes(profile.category)) {
            score++;
            matched.push(`Category Match: ${profile.category}`);
        } else {
            missing.push(`Targeted toward: ${crit.caste.join(', ')}`);
        }
    }

    const calculatedScore = totalCriteria === 0 ? 100 : Math.round((score / totalCriteria) * 100);

    return { 
        score: calculatedScore, 
        matched, 
        missing 
    };
  }
}

export const recommendationService = new RecommendationService();
