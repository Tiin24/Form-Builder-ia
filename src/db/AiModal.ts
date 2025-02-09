'use client'
import { GoogleGenerativeAI} from '@google/generative-ai'

const apiKey: string | undefined = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("API key is missing. Please set GEMINI_API_KEY in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

export const AiChatSession = model.startChat({
    generationConfig,
    history:[]
})