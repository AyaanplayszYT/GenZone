export async function openrouterGenerateComic(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTERKEY;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "free-comics-generator-model", // Replace with actual free model name if needed
      messages: [{ role: "user", content: `Generate a comic: ${prompt}` }],
      max_tokens: 512,
    }),
  });
  if (!response.ok) throw new Error("OpenRouter API error");
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}
