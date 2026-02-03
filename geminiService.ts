
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use the exact process.env.API_KEY string for client initialization as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function processNoteContent(content: string) {
  if (!content || content.length < 5) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Process the following note. Categorize it as either "Idea", "Thought", or "Dream". Provide a very brief, elegant 1-sentence summary in a "soft girl aesthetic" tone. Note: ${content}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              description: "The category of the note. Must be one of: Idea, Thought, Dream.",
            },
            summary: {
              type: Type.STRING,
              description: "A short elegant summary.",
            },
          },
          required: ["category", "summary"],
          propertyOrdering: ["category", "summary"],
        },
      },
    });

    // Fix: Access the text property directly on the response object as per current SDK rules.
    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Gemini processing error:", error);
    return null;
  }
}
