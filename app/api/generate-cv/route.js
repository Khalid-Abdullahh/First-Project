import { GoogleGenerativeAI } from "@google/generative-ai";
export async function POST(request) {
  const body = await request.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(`Enhance this CV and return ONLY valid JSON same structure improved: ${JSON.stringify(body)}`);
  const text = result.response.text().replace(/```json|```/g, "").trim();
  return Response.json(JSON.parse(text));
}