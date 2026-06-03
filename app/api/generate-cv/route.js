import { GoogleGenerativeAI } from "@google/generative-ai";
export async function POST(request) {
  try {
    const body = await request.json();
    const userMsg = body.messages?.[0]?.content || JSON.stringify(body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userMsg);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return Response.json({ content: [{ type: "text", text: text }] });
  } catch(e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}