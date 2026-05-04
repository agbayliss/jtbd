type ContentBlock = { type: string; text?: string };
type AnthropicResponse = { content: ContentBlock[]; error?: { message: string } };

export async function callAnthropic(body: Record<string, unknown>): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Server not configured");
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  const data: AnthropicResponse = await res.json();

  if (!res.ok) {
    const msg = data?.error?.message || `Upstream error (${res.status})`;
    throw new Error(msg);
  }

  return (data.content || [])
    .filter((b) => b.type === "text" && typeof b.text === "string")
    .map((b) => b.text as string)
    .join("");
}
