import OpenAI from "openai";

// Load from environment or use a placeholder for development
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn("OPENAI_API_KEY is not set. AI features will fail until a key is provided.");
}

export const openai = new OpenAI({
    apiKey: apiKey || "placeholder",
});

/**
 * Helper to call LLM and get structured JSON response.
 */
export async function getStructuredResult<T>(
    prompt: string,
    systemPrompt: string = "You are an expert AI assistant.",
    responseFormat: "json_object" | "text" = "json_object"
): Promise<T> {
    if (!apiKey || apiKey === "placeholder") {
        throw new Error("OpenAI API key is missing. Please add OPENAI_API_KEY to your .env file.");
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
        ],
        response_format: { type: responseFormat },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No response from AI");

    return responseFormat === "json_object" ? JSON.parse(content) : content;
}
