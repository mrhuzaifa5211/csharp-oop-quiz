export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  try{
    const {question,answer,language,level}=req.body||{};
    if(!question||!answer) return res.status(400).json({error:"question and answer are required"});
    if(!process.env.OPENAI_API_KEY) return res.status(500).json({error:"AI backend is not configured yet"});
    const prompt=`You are a strict but helpful C#/.NET technical interviewer.
Evaluate the candidate answer against the question.
Return ONLY valid JSON:
{"verdict":"correct|partial|incorrect","score":0-10,"explanation":"...","correctAnswer":"...","missingPoints":["..."],"nextDifficulty":"beginner|intermediate|advanced","followUp":"..."}
Rules: accept different wording when technically equivalent; distinguish incomplete from incorrect; correct technical inaccuracies; do not reward vague statements. Question: ${question}
Candidate answer: ${answer}
Current level: ${level||"beginner"}
Language: ${language||"English"}`;
    const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization:"Bearer "+process.env.OPENAI_API_KEY},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6-mini",input:prompt})});
    if(!r.ok) return res.status(502).json({error:"AI provider request failed"});
    const data=await r.json();
    const raw=(data.output||[]).flatMap(x=>x.content||[]).map(x=>x.text||"").join("").trim();
    const clean=raw.replace(/^\`\`\`json\s*/,"").replace(/\s*\`\`\`$/,"");
    const result=JSON.parse(clean);
    return res.status(200).json(result);
  }catch(e){return res.status(500).json({error:"Evaluation failed"});}
}