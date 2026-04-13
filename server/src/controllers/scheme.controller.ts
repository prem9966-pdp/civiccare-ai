import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { schemeService } from "../services/scheme.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const getSchemes = asyncHandler(async (req: Request, res: Response) => {
  const schemes = await schemeService.getAllSchemes(req.query);

  const mappedSchemes = schemes.map(scheme => {
    const score = req.user ? schemeService.calculateEligibility(req.user.profile, scheme) : 0;
    return { 
        ...scheme.toObject(), 
        eligibilityScore: score,
        isSaved: req.user?.savedSchemes.includes(scheme._id as any) || false 
    };
  });

  return res.status(200).json(
    new ApiResponse(200, mappedSchemes, "Schemes retrieved successfully")
  );
});

export const getSchemeDetails = asyncHandler(async (req: Request, res: Response) => {
  const scheme = await schemeService.getSchemeById(req.params.id);
  const score = req.user ? schemeService.calculateEligibility(req.user.profile, scheme) : 0;

  return res.status(200).json(
    new ApiResponse(200, { ...scheme.toObject(), eligibilityScore: score }, "Scheme details retrieved")
  );
});

export const toggleSave = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");
  const saved = await schemeService.toggleSaveScheme(req.user._id, req.params.id);

  return res.status(200).json(
    new ApiResponse(200, saved, "Scheme save status toggled")
  );
});
