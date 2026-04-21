import GeneratedLetter, { IGeneratedLetter } from "../models/letter.model";
import { ApiError } from '../utils/ApiError';
import { aiService } from "./ai.service";

class LetterService {
  /**
   * Generates a formal complaint/application draft using AI.
   */
  async generateDraft(userId: string, data: any) {
    const { category, addressTo, title, description, language = "English" } = data;

    // Use AI Service to generate formal content in requested language
    const content = await aiService.generateLetter({
        category,
        addressTo,
        title,
        description,
        language
    });

    return await GeneratedLetter.create({
      userId,
      category,
      addressTo,
      title,
      description,
      content,
      language,
      status: 'draft'
    });
  }

  async getLetters(userId: string) {
    return await GeneratedLetter.find({ userId }).sort({ createdAt: -1 });
  }

  async updateLetter(userId: string, id: string, content: string) {
      const letter = await GeneratedLetter.findOne({ _id: id, userId });
      if (!letter) throw new ApiError(404, "Letter not found");
      letter.content = content;
      letter.status = 'final';
      await letter.save();
      return letter;
  }
}

export const letterService = new LetterService();
