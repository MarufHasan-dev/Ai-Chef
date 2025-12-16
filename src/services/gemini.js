import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getRecipeFromGemini(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
