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
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "Gemini API key is not configured in Vercel yet." });
    const prompt = "You are a helpful C#/.NET technical interviewer. Assess the candidate's answer by meaning, accept equivalent Hindi/Hinglish wording, identify incomplete or incorrect parts, and adapt difficulty. Return only a JSON object with verdict (correct/partial/incorrect), score (integer 0-10), explanation, correctAnswer, missingPoints (array), nextDifficulty (beginner/intermediate/advanced), and followUp (one relevant question). Respond in " + (language || "Hindi/Hinglish") + ". Question: " + question + "\nCandidate answer: " + answer + "\nCurrent level: " + (level || "beginner");
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
    const upstream = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
      })
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      const providerCode = data && data.error && data.error.status;
      console.error("Gemini API request failed", upstream.status, providerCode || "unknown");
      const detail = providerCode ? " (" + upstream.status + ", " + String(providerCode).slice(0, 80) + ")" : " (" + upstream.status + ")";
      return res.status(502).json({ error: "Gemini API request failed" + detail + ". Check the API key and its available quota." });
    }
    const raw = (data.candidates || []).flatMap(candidate => candidate.content && candidate.content.parts || []).map(part => part.text || "").join("").trim();
    if (!raw) return res.status(502).json({ error: "Gemini returned an empty response. Please try again." });
    const result = JSON.parse(raw);
    if (!["correct", "partial", "incorrect"].includes(result.verdict)) result.verdict = "partial";
    result.score = Math.max(0, Math.min(10, Number(result.score) || 0));
    if (!["beginner", "intermediate", "advanced"].includes(result.nextDifficulty)) result.nextDifficulty = level || "beginner";
    result.explanation = String(result.explanation || "");
    result.correctAnswer = String(result.correctAnswer || "");
    result.missingPoints = Array.isArray(result.missingPoints) ? result.missingPoints : [];
    result.followUp = String(result.followUp || "");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Evaluation error", error.message);
    return res.status(500).json({ error: "Evaluation failed. Please try again." });
  }
}