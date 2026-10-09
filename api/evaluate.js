export default async function handler(req, res) {
  const origin = "https://mrhuzaifa5211.github.io";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { question, answer, language, level, dayNumber, questionNumber, recentQuestions } = req.body || {};
    if (!question || !answer) return res.status(400).json({ error: "question and answer are required" });
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "Gemini API key is not configured in Vercel yet." });
    const prompt = "You are an experienced human-style C#/.NET interviewer. Evaluate the candidate semantically; accept equivalent Hindi/Hinglish/English answers, explain gaps, and adapt difficulty. Return ONLY valid JSON with verdict (correct/partial/incorrect), score (integer 0-10), explanation, correctAnswer, missingPoints (array), nextDifficulty (beginner/intermediate/advanced), followUp (short probing question about the SAME answer, or empty string), and nextQuestion (the MAIN question for the NEXT turn). The nextQuestion must be a fresh, standalone C#/.NET interview question, not the current question and not a paraphrase of it. Rotate styles naturally: why/how, compare, real-world scenario, predict output, debugging, code design, trade-offs, edge cases, and explain-your-reasoning. Vary topics across C# basics, variables/types, memory, methods, classes/objects, constructors, overloading, inheritance, polymorphism, abstraction, interfaces, static, exceptions, collections, LINQ, async/await, .NET, APIs, and practical design; stay appropriate to candidate level. Day " + (dayNumber || 1) + ", question number " + (questionNumber || 1) + ". Avoid repeating these recent questions: " + JSON.stringify(Array.isArray(recentQuestions) ? recentQuestions.slice(-12) : []) + ". Respond in " + (language || "Hindi/Hinglish") + ". CURRENT QUESTION: " + question + "\nCANDIDATE ANSWER: " + answer + "\nCURRENT LEVEL: " + (level || "beginner");
    const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
    const requestGemini = () => fetch("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
      })
    });
    let upstream = await requestGemini();
    let data = await upstream.json();
    // Retry once for temporary provider overload; do not repeatedly consume quota.
    if (upstream.status === 503 || upstream.status === 502) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      upstream = await requestGemini();
      data = await upstream.json();
    }
    if (!upstream.ok) {
      const providerCode = data && data.error && data.error.status;
      const providerMessage = data && data.error && data.error.message;
      console.error("Gemini API request failed", upstream.status, providerCode || "unknown");
      const detail = providerMessage
        ? " (" + upstream.status + ": " + String(providerMessage).slice(0, 180) + ")"
        : providerCode ? " (" + upstream.status + ", " + String(providerCode).slice(0, 80) + ")" : " (" + upstream.status + ")";
      return res.status(502).json({ error: "Gemini API request failed" + detail + ". Please retry shortly; if it continues, check the API key/model access and quota." });
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