import { callAnthropic } from "@/lib/anthropic";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const ALLOWED_MEDIA_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);
const MAX_BASE64_LENGTH = 8 * 1024 * 1024;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many requests. Try again in a bit." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: { base64?: unknown; mediaType?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const base64 = typeof body.base64 === "string" ? body.base64 : "";
  const mediaType = typeof body.mediaType === "string" ? body.mediaType : "";

  if (!base64 || !mediaType) {
    return Response.json({ error: "Missing image data" }, { status: 400 });
  }
  if (!ALLOWED_MEDIA_TYPES.has(mediaType)) {
    return Response.json({ error: "Unsupported image type" }, { status: 400 });
  }
  if (base64.length > MAX_BASE64_LENGTH) {
    return Response.json({ error: "Image too large" }, { status: 413 });
  }

  try {
    const text = await callAnthropic({
      model: "claude-haiku-4-5",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            {
              type: "text",
              text: "Extract ALL the text from this image, preserving the structure and line breaks. Return ONLY the extracted text, nothing else. No quotes, no preamble, no explanation. If you cannot find any readable text, return exactly: NO_STATEMENT_FOUND",
            },
          ],
        },
      ],
    });

    return Response.json({ text: text.trim() });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/extract]", msg);
    return Response.json({ error: "Extraction failed. Try again." }, { status: 502 });
  }
}
