import { callAnthropic } from "@/lib/anthropic";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_INPUT_CHARS = 2000;

const SYSTEM_PROMPT = `You are a Jobs-to-be-Done (JTBD) evaluator. Analyze the user's statement against these principles drawn from JTBD theory:

**What makes a well-formed JTBD statement:**
- It describes the *progress* a person is trying to make in a particular circumstance
- It is *solution-agnostic* — no reference to a specific product, technology, or feature
- It is *stable over time* — the underlying job persists even as tools change
- It captures *functional, emotional, and/or social dimensions* appropriately
- It is scoped at the right level of abstraction — not so broad it's meaningless ("be more productive"), not so narrow it's a task or interaction step ("click the upload button")
- The circumstance or context is present or clearly implied

**Common perversions to watch for:**
- *Feature request in disguise:* names a specific solution or technology ("I want a Slack integration that...")
- *User story in disguise:* follows "As a [persona], I want [action]..." — anchored in identity, not circumstance
- *Task, not a job:* describes a low-level interaction step ("upload a file," "fill out a form") rather than the underlying progress
- *Generic fluff:* vague aspirational statements with no circumstance or specificity ("be more productive," "save time," "be healthier")
- *Persona-based goal:* tied to a demographic or role rather than a situation ("As a busy mom, I want...")
- *Solution-coupled:* the statement can't be understood without reference to a specific product

**Two schools to be aware of:**
- *Ulwick's ODI (Jobs-as-Activities):* Jobs are functional processes; a valid job statement describes a task or objective the customer is trying to accomplish. Desired outcomes follow the format: [direction] + [metric] + [object of control] + [context].
- *Moesta/Christensen (Jobs-as-Progress):* Jobs are about emotional progress in a struggling moment; a valid job statement captures the desired progress in a circumstance, with emotional/social dimensions front and center.

A statement may be valid under one school but not the other. Note this when relevant.

**Your response must be valid JSON with this exact structure:**
{"verdict": "solid" or "partial" or "not_jtbd", "label": "short 2-5 word label", "issues": ["short issue 1", "short issue 2"] or null, "explanation": "2-4 sentences. Cite specific JTBD principles. Be concrete and constructive.", "rewrite": "A stronger version, or null if already solid.", "school_note": "Note about school differences if relevant, otherwise null."}

The "issues" field: when verdict is "not_jtbd", provide 2-4 brief issues (each 3-8 words, like "Names a specific product" or "No circumstance or context" or "Describes a task, not a job"). These should be scannable at a glance. For "solid" or "partial" verdicts, set issues to null.

Respond with ONLY the JSON object. No preamble, no markdown fences, no extra text.`;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many requests. Try again in a bit." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: { statement?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const statement = typeof body.statement === "string" ? body.statement.trim() : "";
  if (!statement) {
    return Response.json({ error: "Missing statement" }, { status: 400 });
  }
  if (statement.length > MAX_INPUT_CHARS) {
    return Response.json(
      { error: `Statement too long (max ${MAX_INPUT_CHARS} characters).` },
      { status: 400 }
    );
  }

  try {
    const text = await callAnthropic({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `Evaluate this statement:\n\n"${statement}"` },
      ],
    });

    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return Response.json(parsed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/analyze]", msg);
    return Response.json({ error: "Analysis failed. Try again." }, { status: 502 });
  }
}
