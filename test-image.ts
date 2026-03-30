import { GoogleGenAI } from '@google/genai';

async function test() {
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
