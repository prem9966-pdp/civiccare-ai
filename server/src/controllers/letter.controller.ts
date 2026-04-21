import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { letterService } from "../services/letter.service";
import { pdfService } from "../services/pdf.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from '../utils/ApiError';

export const createDraft = asyncHandler(async (req: Request, res: Response) => {
  // MANDATORY DEBUG LOGS (Step 3)
  console.log("[DRAFT BACKEND] Route hit");
  console.log("[DRAFT BACKEND] req.user:", (req as any).user);
  console.log("[DRAFT BACKEND] req.body:", req.body);
  console.log("[DRAFT BACKEND] Selected Language:", req.body.language);
  console.log("[DRAFT BACKEND] AI key exists:", !!process.env.AI_API_KEY);

  if (!req.user) throw new ApiError(401, "Auth required");

  try {
    const draft = await letterService.generateDraft(req.user._id.toString(), req.body);
    
    // MANDATORY DEBUG LOGS (Step 3)
    console.log("[DRAFT BACKEND] Draft result:", draft);

    return res.status(201).json(
      new ApiResponse(201, draft, "Draft letter generated successfully")
    );
  } catch (error) {
    // MANDATORY DEBUG LOGS (Step 3)
    console.log("[DRAFT BACKEND] Error:", error);
    throw error;
  }
});

export const getMyLetters = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");
  const letters = await letterService.getLetters(req.user._id.toString());

  return res.status(200).json(
    new ApiResponse(200, letters, "Historical letters retrieved")
  );
});

export const updateLetterContent = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Auth required");
    const { content } = req.body;
    const letter = await letterService.updateLetter(req.user._id.toString(), req.params.id, content);

    return res.status(200).json(
      new ApiResponse(200, letter, "Letter content finalized")
    );
});

export const exportPDF = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Auth required");
    const { id } = req.params;
    const letters = await letterService.getLetters(req.user._id.toString());
    const letter = letters.find(l => l._id.toString() === id);

    if (!letter) throw new ApiError(404, "Letter not found");

    const pdfUrl = await pdfService.generatePDF(letter.content, `${letter.category}_${letter.title}`);

    return res.status(200).json(
      new ApiResponse(200, { pdfUrl }, "PDF export link generated")
    );
});
