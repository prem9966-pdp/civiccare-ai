import axios from "axios";
import { SYSTEM_PROMPT, EMERGENCY_KEYWORDS } from "../utils/prompts";
import { ENV } from "../config/env";

class AIService {
  /**
   * Generates a counselor response using Gemini AI.
   * Logic:
   * 1. Detect Emergency.
   * 2. Call Gemini API.
   * 3. Fallback to mock logic if API fails or No key.
   */
  async generateResponse(userMessage: string, history: any[] = []) {
    const isEmergency = this.detectEmergency(userMessage);
    const apiKey = ENV.GEMINI_API_KEY || ENV.AI_API_KEY;

    const isPlaceholder = !apiKey || 
                          apiKey.includes("your_") || 
                          apiKey === "your_api_key" || 
                          apiKey === "your_gemini_key";

    if (isPlaceholder) {
      console.log(`[AI_SERVICE] ⚠️ FALLBACK MODE: No valid API key found. Using Mock Logic.`);
      return this.generateMockResponse(userMessage, isEmergency, history.length);
    }

    try {
      console.log(`[AI_SERVICE] 🚀 LIVE MODE: Calling Gemini API...`);
      // Prepare prompt with context
      const chatHistory = history
        .map((m) => `${m.sender === "user" ? "Citizen" : "Counselor"}: ${m.content}`)
        .join("\n");

      const prompt = `${SYSTEM_PROMPT}\n\nCONVERSATION HISTORY:\n${chatHistory}\nCitizen: ${userMessage}\nCounselor:`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        }
      );

      const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error("Empty response from AI engine");
      }

      console.log(`[AI_SERVICE] ✅ SUCCESS: Gemini responded successfully.`);
      return {
        content: content.trim(),
        isEmergency,
      };
    } catch (error: any) {
      console.error(`[AI_SERVICE] ❌ API ERROR: ${error.response?.data?.error?.message || error.message}`);
      console.log(`[AI_SERVICE] 🔄 FALLBACK: Reverting to Mock Response due to error.`);
      return this.generateMockResponse(userMessage, isEmergency, history.length);
    }
  }

  private detectEmergency(message: string): boolean {
    const lower = message.toLowerCase();
    return EMERGENCY_KEYWORDS.some((k) => lower.includes(k));
  }

  private generateMockResponse(message: string, isEmergency: boolean, historyLen: number = 0) {
    const input = message.toLowerCase();
    let content = "";

    // 1. Emergency Handling (Highest Priority)
    if (isEmergency) {
      return {
        content: "⚠️ [EMERGENCY ACTION]: Please call 102 (Ambulance) or 100 (Police) immediately. Find the nearest hospital using our 'Help Centers' map. Stay calm. I am monitoring your location for nearby clinics.",
        isEmergency: true
      };
    }

    // 2. Intent Detection
    if (input.includes("grievance") || input.includes("complain") || input.includes("issue")) {
      content = "To file a **formal grievance**, follow these steps:\n- Go to the **Grievance Portal** in your dashboard.\n- Click on 'New Request' and select the relevant category (e.g., Water, Electricity, Road).\n- Upload a photo of the issue if possible.\n- Use your **Aadhar ID** to track the status in real-time.";
    } 
    else if (input.includes("student") || input.includes("scholarship") || input.includes("education")) {
      content = "For **students**, I recommend checking these schemes:\n- **Post-Matric Scholarship**: For SC/ST/OBC students.\n- **PM-USP**: Financial support for higher education.\n- **Kanya Sumangala**: Support for the girl child's education.\n\nYou can find these in the **Scheme Finder** section.";
    }
    else if (input.includes("farmer") || input.includes("kisan") || input.includes("agriculture")) {
      content = "For **farmers**, there are several life-changing schemes available:\n- **PM-Kisan**: ₹6,000 annual direct income support.\n- **PM-Fasal Bima**: Insurance for your crops against damage.\n- **Soil Health Card**: Optimize your yield through soil testing.\n\nI can help you prepare the land documents needed for these. Would you like to proceed?";
    }
    else if (input.includes("hospital") || input.includes("medical") || input.includes("doctor")) {
      content = "I can help with **healthcare access**:\n- Use our **Healthcare Map** to find verified public hospitals near you.\n- Check eligibility for **PM-JAY (Ayushman Bharat)** for free treatment up to ₹5 Lakhs.\n- Do you need help finding a specific department like Cardiology or Pediatrics?";
    }
    else if (input.includes("document") || input.includes("aadhar") || input.includes("pan")) {
      content = "For most Indian government services, you need these **Standard Documents**:\n- **Identity**: Aadhar Card or Voter ID.\n- **Address**: Electricity bill or Ration card.\n- **Income**: Income Certificate from Tahsildar.\nYou can manage these in your **Digital Vault** here.";
    }
    else {
      // Default / Greeting
      if (historyLen === 0) {
        content = "Hello! I am your **CivicCare AI Counselor**. I can help you with government schemes, filing grievances, or finding medical help. What can I assist you with today?";
      } else {
        content = "I'm here to help, Citizen. Could you please provide more details about the scheme or service you are looking for?";
      }
    }

    return { content, isEmergency: false };
  }
}

export const aiService = new AIService();
