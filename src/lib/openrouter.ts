export async function generateWithOpenRouter(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTERKEY;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // You can change model as needed
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
    }),
  });
  if (!response.ok) throw new Error("OpenRouter API error");
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}
