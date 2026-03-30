import { GoogleGenAI } from '@google/genai';

async function test() {
  console.log("API Key exists:", !!process.env.GEMINI_API_KEY);
  if (!process.env.GEMINI_API_KEY) {
    console.log("No API key found in process.env");
    return;
  }
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `Generate an image of: a cat` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: '1:1'
      }
    }
  });

  console.log(JSON.stringify(response, null, 2));
}

test().catch(console.error);
