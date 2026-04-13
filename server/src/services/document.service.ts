import UploadedDocument from "../models/document.model";
import Scheme from "../models/scheme.model";
import { ApiError } from "../utils/ApiError";

class DocumentService {
  async saveDocument(userId: string, data: any) {
    return await UploadedDocument.create({ ...data, userId });
  }

  async getUserDocuments(userId: string) {
    return await UploadedDocument.find({ userId }).sort({ createdAt: -1 });
  }

  async deleteDocument(userId: string, docId: string) {
    const doc = await UploadedDocument.findOne({ _id: docId, userId });
    if (!doc) throw new ApiError(404, "Document not found or unauthorized");
    
    await doc.deleteOne();
    return true;
  }

  /**
   * Calculates which required documents for a scheme are already uploaded.
   */
  async getChecklistForScheme(userId: string, schemeId: string) {
    const scheme = await Scheme.findById(schemeId);
    if (!scheme) throw new ApiError(404, "Scheme not found");

    const userDocs = await UploadedDocument.find({ userId });
    const uploadedTypes = userDocs.map(d => d.type.toLowerCase());

    const checklist = scheme.requiredDocs.map(reqDoc => {
        const isMatched = uploadedTypes.some(type => reqDoc.toLowerCase().includes(type));
        return {
            name: reqDoc,
            isUploaded: isMatched,
            status: isMatched ? 'verified' : 'pending'
        };
    });

    const completionRate = Math.round((checklist.filter(c => c.isUploaded).length / checklist.length) * 100);

    return { checklist, completionRate };
  }
}

export const documentService = new DocumentService();
