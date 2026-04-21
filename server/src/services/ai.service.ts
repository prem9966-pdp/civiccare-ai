import axios from "axios";
import { SYSTEM_PROMPT, EMERGENCY_KEYWORDS } from "../utils/prompts";
import { ENV } from "../config/env";

class AIService {
  /**
   * Generates a counselor response using Gemini AI.
   * Ensures zero generic replies and forces structured output.
   */
  async generateResponse(userMessage: string, history: any[] = []) {
    const isEmergency = this.detectEmergency(userMessage);
    const apiKey = ENV.GEMINI_API_KEY || ENV.AI_API_KEY;

    // Strict check for API Key placeholder or invalidity
    const isInvalidKey = !apiKey || 
                         apiKey.includes("your_") || 
                         apiKey === "your_api_key" || 
                         apiKey === "your_gemini_key" ||
                         apiKey.length < 15;

    if (isInvalidKey) {
      console.log(`[AI_SERVICE] ⚠️ SYSTEM ALERT: No valid API key. Using High-Quality Structured Fallback.`);
      return this.generateMockResponse(userMessage, isEmergency);
    }

    try {
      console.log(`[AI_SERVICE] 🚀 Live Logic: Consulting AI with System Prompt...`);
      
      // Construct clean history context
      const chatContext = history
        .slice(-6) 
        .map((m) => `${m.sender === "user" ? "Citizen" : "CivicCare AI"}: ${m.content}`)
        .join("\n");

      const prompt = `CORE INSTRUCTION: ${SYSTEM_PROMPT}\n\nCONVERSATION SO FAR:\n${chatContext}\n\nCURRENT REQUEST:\nCitizen: ${userMessage}\nCivicCare AI:`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 12000,
        }
      );

      const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content || typeof content !== 'string' || content.length < 5) {
        throw new Error("Invalid response from AI model.");
      }

      return {
        content: content.trim(),
        isEmergency,
      };
    } catch (error: any) {
      console.error(`[AI_SERVICE] ❌ API FAILURE: ${error.message}`);
      return this.generateMockResponse(userMessage, isEmergency);
    }
  }

  /**
   * Generates a professionally formatted formal letter in the requested language.
   * STRICTLY enforces native scripts and formal tone.
   */
  async generateLetter(data: { category: string, addressTo: string, title: string, description: string, language: string }) {
    const { category, addressTo, title, description, language } = data;
    const apiKey = ENV.GEMINI_API_KEY || ENV.AI_API_KEY;

    // Define explicit script mapping for high accuracy
    const scriptMapping: any = {
        "Hindi": "Hindi (Devanagari script)",
        "Marathi": "Marathi (Devanagari script)",
        "Kannada": "Kannada (Kannada script)",
        "Telugu": "Telugu (Telugu script)",
        "Tamil": "Tamil (Tamil script)",
        "Malayalam": "Malayalam (Malayalam script)",
        "Bengali": "Bengali (Bengali script)",
        "Gujarati": "Gujarati (Gujarati script)",
        "Punjabi": "Punjabi (Gurmukhi script)",
        "Odia": "Odia (Odia script)",
        "Assamese": "Assamese (Assamese script)"
    };

    const targetScript = scriptMapping[language] || language;

    const prompt = `
      You are an official Indian Civic Advocate and Government Liaison Officer. 
      Your task is to generate a formal and legally sound ${category} letter.

      ### CRITICAL INSTRUCTION:
      1. OUTPUT LANGUAGE: You MUST generate the EXACT and ENTIRE content in ${targetScript}.
      2. SCRIPT: Use the native script for the language (e.g., Devanagari for Marathi).
      3. NO ENGLISH: Do not use English words or characters unless the target language is English or if it's a technical term without a native equivalent (rarely).
      4. TONE: High-authority, formal municipal/government tone.
      
      ### LETTER DETAILS:
      - Addressed To: ${addressTo}
      - Subject: ${title}
      - Context/Grievance: ${description}

      ### STRUCTURE:
      - Recipient Block: (To, [Name/Post], [Department/Office])
      - Date: (Placeholder)
      - Subject Line: (Clear and formal)
      - Salutation: (Respectful greeting)
      - Body: (Minimum 3 detailed paragraphs: Introduction, Context of issue, Requested Resolution)
      - Closing: (Formal sign-off)
      - Sender Block: (Name, Address, Phone Placeholders)

      ### FORMATTING:
      - Use Markdown for bolding headers.
      - Return ONLY the letter content. No conversational intros.
    `;

    try {
      if (!apiKey || apiKey.includes("your_") || apiKey.length < 15) throw new Error("Invalid API Key");

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        { headers: { "Content-Type": "application/json" }, timeout: 15000 }
      );

      const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error("Empty AI response");

      return content.trim();
    } catch (error) {
      console.error("[AI_SERVICE] Multilingual Generation Failure, using placeholder:", error);
      
      return `
To: ${addressTo}

Subject: ${title} (${language})

[SYSTEM NOTE: AI Generation failed. Below is the untranslated draft details for manual drafting in ${language}]

Description: ${description}

---
Yours faithfully,
[Citizen Name]
      `.trim();
    }
  }

  private detectEmergency(message: string): boolean {
    const lower = message.toLowerCase();
    return EMERGENCY_KEYWORDS.some((k) => lower.includes(k));
  }

  /**
   * Premium Fallback Logic (Zero Generic Phrases)
   * Provides clean, structured Markdown responses when API fails.
   */
  private generateMockResponse(message: string, isEmergency: boolean) {
    const input = message.toLowerCase();
    
    if (isEmergency) {
      return {
        content: "### ⚠️ EMERGENCY ACTION REQUIRED\nPlease dial **102 (Ambulance)** or **108 (Emergency Operations)** immediately.\n\n**Steps:**\n- Locate the nearest Hospital using the **Help Centers Map** in your dashboard.\n- Keep your **Aadhar Card** or medical ID available for the admission team.\n- Stay calm and keep your phone line open for emergency services.\n\n**Tip:** You can check for Blood availability in the medical registry section.",
        isEmergency: true
      };
    }

    if (input.includes("ayushman") || input.includes("pmjay") || input.includes("health card")) {
      return {
        content: "### Ayushman Bharat (PM-JAY) Eligibility\n**Ayushman Bharat** provides free medical coverage of up to **₹5 Lakhs** per year for families across the country.\n\n**Steps:**\n- Verify your name in the SECC-2011 database via the **PMJAY Official Portal**.\n- Visit any **Empanelled Public or Private Hospital** (PM-JAY Mitra).\n- Complete your **E-KYC** using Aadhar for card generation.\n\n**Tip:** Use the 'NHA' mobile app to check your balance and empanelled lists.",
        isEmergency: false
      };
    }

    if (input.includes("ration") || input.includes("food") || input.includes("pds")) {
      return {
        content: "### Ration Card & Food Security Guidance\nThe **One Nation One Ration Card** system allows citizens to collect food grains from any Fair Price Shop in India.\n\n**Steps:**\n- Apply for a new Ration Card on your State's **Food & Civil Supplies** website.\n- Ensure your **Aadhar is linked** to your Ration ID for Biometric verification.\n- Visit the nearest **E-POS enabled** ration shop for collection.\n\n**Tip:** Check with your Ration Dealer if you qualify for the Antyodaya Anna Yojana (AAY).",
        isEmergency: false
      };
    }

    if (input.includes("grievance") || input.includes("complain") || input.includes("road") || input.includes("electricity")) {
      return {
        content: "### Filing a Official Civic Grievance\nYou can report failures in municipal services directly to the designated department via CivicCare.\n\n**Steps:**\n- Navigate to the **Grievances Dashboard** in your app sidebar.\n- Submit a **New Complaint** with a photo of the issue.\n- Note down the **Grievance ID** for real-time tracking.\n\n**Tip:** Be specific about the locality/landmark for a faster response times.",
        isEmergency: false
      };
    }

    // Strict Domain Lock Enforcement
    const expertiseKeywords = ["scheme", "hospital", "doctor", "health", "scholarship", "kisan", "farmer", "pension", "card", "id", "aadhar", "voter", "passport", "citizen", "civic", "issue", "complain", "help"];
    const isUnrelated = !expertiseKeywords.some(k => input.includes(k));

    if (isUnrelated && input.length > 5) {
      return {
        content: "I specialize in **government schemes**, **healthcare services**, and **civic assistance**. Please ask a related question so I can provide you with accurate guidance.",
        isEmergency: false
      };
    }

    return {
      content: "### CivicCare GPT Counselor\nI am your specialized assistant for **Indian government schemes**, **medical access**, and **civic services**.\n\n**Common Queries I can help with:**\n- How to apply for **Ration Cards** or **Aadhar**.\n- Find nearest **Government Hospitals**.\n- Assistance with **Crop Insurance (PMFBY)**.\n- Reporting **Water/Road issues** to the municipality.\n\n**Tip:** Providing your **State/City** helps me give you accurate local information.",
      isEmergency: false
    };
  }
}

export const aiService = new AIService();
