import GeneratedLetter, { IGeneratedLetter } from "../models/letter.model";
import { ApiError } from '../utils/ApiError';

class LetterService {
  /**
   * Generates a formal complaint/application draft.
   */
  async generateDraft(userId: string, data: any) {
    const { type, authority, subject, details, language = "English" } = data;

    const templates: any = {
      Complaint: `
To: The Commissioner, 
${authority} Department

Subject: Formal Complaint regarding ${subject}

Sir/Madam,

I am writing to bring to your immediate attention a critical issue regarding ${details}. 

[DETAILED_ISSUE_HERE]

I request you to look into this matter and take necessary actions at the earliest. 

Yours faithfully,
[USER_NAME]
[USER_PHONE]
      `,
      Application: `
To: The Deputy Director, 
${authority} Department

Subject: Application for ${subject}

Sir/Madam,

I, [USER_NAME], am submitting this application for the purpose of ${details}. 

I have attached the required documents for your review and necessary verification. 

Kindly process this application as per the official deadlines.

Thanking you,
[USER_NAME]
      `
    };

    const content = (templates[type] || templates.Complaint)
        .replace("[DETAILED_ISSUE_HERE]", details)
        .trim();

    return await GeneratedLetter.create({
      userId,
      type,
      authority,
      subject,
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
