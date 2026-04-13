import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { documentService } from "../services/document.service";
import { uploadService } from "../services/upload.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from '../utils/ApiError';

export const uploadDocument = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");
  if (!req.file) throw new ApiError(400, "Please select a file to upload");

  const { title, type } = req.body;
  if (!title || !type) throw new ApiError(400, "Document title and type are required");

  // Step 1: Upload to store
  const fileUrl = await uploadService.uploadFile(req.file);

  // Step 2: Save to DB
  const docData = {
      title,
      type,
      originalName: req.file.originalname,
      fileUrl,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
  };

  const document = await documentService.saveDocument(req.user._id, docData);

  return res.status(201).json(
    new ApiResponse(201, document, "Document uploaded successfully")
  );
});

export const getMyDocuments = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");
  const documents = await documentService.getUserDocuments(req.user._id);

  return res.status(200).json(
    new ApiResponse(200, documents, "Documents retrieved successfully")
  );
});

export const getChecklist = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Auth required");
    const { schemeId } = req.params;
    const checklistData = await documentService.getChecklistForScheme(req.user._id, schemeId);

    return res.status(200).json(
      new ApiResponse(200, checklistData, "Scheme checklist generated")
    );
});

export const deleteDocument = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Auth required");
    await documentService.deleteDocument(req.user._id, req.params.id);

    return res.status(200).json(
      new ApiResponse(200, null, "Document deleted successfully")
    );
});
