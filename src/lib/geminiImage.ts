export async function generateGeminiImage(prompt: string): Promise<string> {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, topK: 32, topP: 1 }
    }),
  });
  if (!response.ok) throw new Error("Gemini API error");
  const data = await response.json();
  // Try to find base64 image data in the response
  const parts = data.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData && part.inlineData.mimeType?.startsWith("image/")) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  // Fallback to text if no image found
  return parts[0]?.text || "";
}
