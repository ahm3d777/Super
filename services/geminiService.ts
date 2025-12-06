import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || ''; // In a real app, this comes from env

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: API_KEY });
    }
  }

  async getMotivationalQuote(workoutType: string): Promise<string> {
    if (!this.ai) {
      return "Pain is temporary. Pride is forever. Crush this workout!";
    }

    try {
      const model = 'gemini-2.5-flash';
      const prompt = `Give me a short, intense, anime-style motivational quote for a warrior about to do a ${workoutType} workout. Max 20 words.`;
      
      const response = await this.ai.models.generateContent({
        model: model,
        contents: prompt,
      });

      return response.text || "Push beyond your limits!";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Defeat is not an option. Train harder!";
    }
  }

  async getWorkoutTip(exerciseName: string): Promise<string> {
    if (!this.ai) {
      return "Focus on your form and control the weight.";
    }

    try {
      const model = 'gemini-2.5-flash';
      const prompt = `Give me one pro-tip for the exercise: ${exerciseName}. Keep it concise and technical.`;

      const response = await this.ai.models.generateContent({
        model: model,
        contents: prompt,
      });
      
      return response.text || "Keep your core tight.";
    } catch (error) {
       console.error("Gemini API Error:", error);
       return "Consistency is key.";
    }
  }
}

export const geminiService = new GeminiService();