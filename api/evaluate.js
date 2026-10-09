export default async function handler(req, res) {
  const origin = "https://mrhuzaifa5211.github.io";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { question, answer, language, level } = req.body || {};
    if (!question || !answer) return res.status(400).json({ error: "question and answer are required" });
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "AI backend is not configured yet" });
    const prompt = "You are a helpful C#/.NET technical interviewer. Assess the answer by meaning, accept equivalent Hindi/Hinglish wording, identify incomplete or incorrect parts, and adapt difficulty. Return a JSON object with verdict (correct/partial/incorrect), score (integer 0-10), explanation, correctAnswer, missingPoints (array), nextDifficulty (beginner/intermediate/advanced), and followUp (one relevant question). Respond in " + (language || "Hindi/Hinglish") + ". Question: " + question + "\nCandidate answer: " + answer + "\nCurrent level: " + (level || "beginner");
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + process.env.OPENAI_API_KEY },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", input: prompt, text: { format: { type: "json_object" } } })
    });
    const data = await upstream.json();
    if (!upstream.ok) { console.error("OpenAI API request failed", upstream.status); return res.status(502).json({ error: "AI provider request failed. Check API key permissions and billing." }); }
    const raw = data.output_text || (data.output || []).flatMap(item => item.content || []).map(item => item.text || "").join("").trim();
    if (!raw) return res.status(502).json({ error: "AI returned an empty response" });
    const result = JSON.parse(raw);
    if (!["correct", "partial", "incorrect"].includes(result.verdict)) result.verdict = "partial";
    result.score = Math.max(0, Math.min(10, Number(result.score) || 0));
    if (!["beginner", "intermediate", "advanced"].includes(result.nextDifficulty)) result.nextDifficulty = level || "beginner";
    result.explanation = String(result.explanation || "");
    result.correctAnswer = String(result.correctAnswer || "");
    result.missingPoints = Array.isArray(result.missingPoints) ? result.missingPoints : [];
    result.followUp = String(result.followUp || "");
    return res.status(200).json(result);
  } catch (error) { console.error("Evaluation error", error.message); return res.status(500).json({ error: "Evaluation failed. Please try again." }); }
}