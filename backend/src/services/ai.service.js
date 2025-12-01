import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

export async function generateText(code) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const systemPrompt = `
You are an expert senior code reviewer with 7+ years of experience.
Analyze the provided code and return:

- Issues or bugs
- Best practices
- Performance improvements
- Security issues
- Readability improvements
- A rewritten improved version of the code
    `;

    const finalPrompt = `
System Instructions:
${systemPrompt}

User Code:
\`\`\`
${code}
\`\`\`

Please provide a detailed review.
    `;

    const result = await model.generateContent(finalPrompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate review");
  }
}
