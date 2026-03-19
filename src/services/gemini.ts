import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiModel = "gemini-3-flash-preview";

export async function getVolunteerMatches(userInput: string) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: userInput,
    config: {
      systemInstruction: `You are an AI Volunteer Matching Assistant for SmartHelp. 
      Your goal is to match volunteers to NGO tasks based on their availability and interests.
      
      Return a JSON array of 3 match objects. Each object must have:
      - ngoName: string
      - task: string
      - time: string (e.g. "2 hours", "Saturday morning")
      - description: string (brief)
      - impactPoints: number (between 50 and 200)
      
      If the user input is vague, suggest relevant social causes common in India (Education, Environment, Health, Animal Welfare).
      
      User input: "${userInput}"`,
      responseMimeType: "application/json"
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
}
