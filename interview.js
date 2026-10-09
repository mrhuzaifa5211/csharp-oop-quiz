const LANGS={
  "hi-IN":{voice:"hi-IN",start:"नमस्ते। आपका C# mock interview शुरू करते हैं। पहले मैं आपका level समझूंगा।",listen:"Mic दबाकर अपने शब्दों में answer दीजिए।",thinking:"आपका answer evaluate कर रहा हूँ...",again:"Answer दोबारा बोलिए।",done:"Interview पूरा हो गया। नीचे आपका detailed report है।"},
  "en-IN":{voice:"en-IN",start:"Hello. Let's start your C sharp mock interview. I will first understand your level.",listen:"Press the microphone and answer in your own words.",thinking:"Evaluating your answer...",again:"Please answer again.",done:"The interview is complete. Here is your detailed report."},
  "hinglish":{voice:"hi-IN",start:"Hello! Chalo C sharp ka proper mock interview start karte hain. Pehle main tumhara level samjhunga.",listen:"Mic dabao aur apne words mein answer do.",thinking:"Tumhara answer evaluate kar raha hoon...",again:"Answer ek baar phir do.",done:"Interview complete ho gaya. Yeh raha tumhara detailed report."}
};

const BANK=[
{id:"class-object",topic:"Class & Object",level:1,q:{hi:"Class aur object mein kya difference hai?",en:"What is the difference between a class and an object?",hinglish:"Class aur object mein actual difference kya hota hai?"},keys:["class","blueprint","template","object","instance"],required:["class","object"],answer:{hi:"A class is a blueprint or template, while an object is an instance of that class created at runtime.",en:"A class is a blueprint or template, while an object is an instance of that class created at runtime.",hinglish:"Class blueprint/template hoti hai, aur object us class ka instance hota hai."},hint:{hi:"Ek ko blueprint aur doosre ko us blueprint se bani real entity samjho.",en:"Think of one as the blueprint and the other as the real instance created from it.",hinglish:"Ek blueprint hai aur doosra us blueprint se bani real entity."},follow:["constructor"]},
{id:"constructor",topic:"Constructor",level:1,q:{hi:"Constructor kya hota hai?",en:"What is a constructor?",hinglish:"Constructor kya hota hai aur kab call hota hai?"},keys:["constructor","special member","object","initialize","initialise","no return"],required:["special member","object"],answer:{hi:"A constructor is a special member of a class used to initialize an object when it is created. It has the same name as the class and no return type.",en:"A constructor is a special member used to initialize an object when it is created. It has the same name as the class and no return type.",hinglish:"Constructor class ka special member hota hai jo object create hone par initialization ke liye automatically call hota hai."},hint:{hi:"Object creation ke time kya automatically execute hota hai, yaad karo.",en:"Think about what runs automatically when an object is created.",hinglish:"Object banate time jo automatically run hota hai usko yaad karo."},follow:["constructor-overload"]},
{id:"method-overload",topic:"Method Overloading",level:1,q:{hi:"Method overloading kya hai?",en:"What is method overloading?",hinglish:"Method overloading ka matlab kya hai?"},keys:["same method","same name","different parameter","different parameters","compile time","overload"],required:["same name","different parameter"],answer:{hi:"Method overloading means defining multiple methods with the same name but different parameter lists in the same class.",en:"Method overloading means defining multiple methods with the same name but different parameter lists in the same class.",hinglish:"Same method name ke multiple methods banana, but parameter list different rakhna, method overloading hai."},hint:{hi:"Method ka naam same rakho, parameters mein kya change hota hai?",en:"The method name stays the same; think about what changes in the parameter list.",hinglish:"Name same hota hai, parameter list mein kya difference hota hai socho."},follow:["constructor-overload"]},
{id:"constructor-overload",topic:"Constructor Overloading",level:1,q:{hi:"Constructor ko overload kaise karte hain?",en:"How do you overload a constructor?",hinglish:"Constructor overloading kaise karoge?"},keys:["multiple constructor","different parameter","parameter list","same class","overload"],required:["multiple","different parameter"],answer:{hi:"Create multiple constructors in the same class with different parameter lists.",en:"Create multiple constructors in the same class with different parameter lists.",hinglish:"Same class mein multiple constructors banao aur unki parameter lists different rakho."},hint:{hi:"Overloading ka same rule constructor par apply karo.",en:"Apply the same overloading rule to constructors.",hinglish:"Overloading ka basic rule constructor par apply karo."},follow:["this-keyword"]},
{id:"this-keyword",topic:"this Keyword",level:1,q:{hi:"C# mein this keyword kis liye use hota hai?",en:"Why do we use the this keyword in C#?",hinglish:"this keyword ka use kis liye hota hai?"},keys:["current object","current instance","instance", "this"],required:["current object"],answer:{hi:"The this keyword refers to the current object or current instance of the class.",en:"The this keyword refers to the current object or current instance of the class.",hinglish:"this current object ya current instance ko refer karta hai."},hint:{hi:"Socho method ke andar current object ko kaise refer karoge.",en:"Think about how a class refers to its current instance.",hinglish:"Class ke andar current object ko refer karne wala keyword yaad karo."},follow:["inheritance"]},
{id:"inheritance",topic:"Inheritance",level:2,q:{hi:"Inheritance kya hai?",en:"What is inheritance in C#?",hinglish:"Inheritance kya hota hai aur iska benefit kya hai?"},keys:["base class","derived class","inherit","reuse","members","parent","child"],required:["base class","derived class"],answer:{hi:"Inheritance allows a derived class to acquire accessible members of a base class, helping reuse common behavior.",en:"Inheritance allows a derived class to acquire accessible members of a base class, helping reuse common behavior.",hinglish:"Inheritance mein derived class base class ke accessible members ko use karti hai aur code reuse hota hai."},hint:{hi:"Parent/base class aur child/derived class ka relation socho.",en:"Think about the relationship between a base class and a derived class.",hinglish:"Base class aur derived class ka relationship yaad karo."},follow:["override"]},
{id:"polymorphism",topic:"Polymorphism",level:2,q:{hi:"Polymorphism ka simple meaning kya hai?",en:"What does polymorphism mean in OOP?",hinglish:"Polymorphism ka simple meaning kya hai?"},keys:["many forms","different behavior","different implementation","same interface","override","overloading"],required:["many forms"],answer:{hi:"Polymorphism means one interface or base type can represent different implementations or forms of behavior.",en:"Polymorphism means one interface or base type can represent different implementations or forms of behavior.",hinglish:"Polymorphism ka meaning many forms hai, jahan same interface/base type different implementations ko represent kar sakta hai."},hint:{hi:"Word ko break karo: poly + morph. Behavior ke multiple forms socho.",en:"Break down the word and think about multiple forms of behavior.",hinglish:"Poly ka relation many aur morph ka relation form se socho."},follow:["override"]},
{id:"override",topic:"Method Overriding",level:2,q:{hi:"Base class ke virtual method ko derived class mein change karna ho to kya use karoge?",en:"What keyword is used to override a virtual method in a derived class?",hinglish:"Virtual method ko derived class mein override karne ke liye kya use karoge?"},keys:["override","virtual","derived"],required:["override"],answer:{hi:"The override keyword is used in the derived class to provide a new implementation of a virtual or abstract member.",en:"The override keyword is used in the derived class to provide a new implementation of a virtual or abstract member.",hinglish:"Derived class mein virtual ya abstract member ki implementation dene ke liye override keyword use hota hai."},hint:{hi:"virtual ke opposite pair mein derived class wala keyword yaad karo.",en:"Think of the keyword paired with virtual members in a derived class.",hinglish:"virtual member ko derived class mein implement karne wala keyword yaad karo."},follow:["abstract"]},
{id:"abstract",topic:"Abstract Class",level:2,q:{hi:"Abstract class kya hai aur ise directly instantiate kar sakte hain?",en:"What is an abstract class, and can it be instantiated directly?",hinglish:"Abstract class kya hoti hai aur kya iska direct object bana sakte hain?"},keys:["abstract","cannot instantiate","base class","abstract method","non abstract"],required:["abstract","cannot instantiate"],answer:{hi:"An abstract class cannot be instantiated directly. It is mainly used as a base class and can contain abstract and non-abstract members.",en:"An abstract class cannot be instantiated directly. It is mainly used as a base class and can contain abstract and non-abstract members.",hinglish:"Abstract class ka direct object nahi bana sakte; ye mainly base class ke roop mein use hoti hai aur abstract/non-abstract members rakh sakti hai."},hint:{hi:"Pehle direct object creation ke rule ko identify karo.",en:"First recall the rule about direct object creation.",hinglish:"Sabse pehle direct object banane ka rule yaad karo."},follow:["interface"]},
{id:"sealed",topic:"Sealed Class",level:2,q:{hi:"Sealed class ka purpose kya hai?",en:"What is the purpose of a sealed class?",hinglish:"Sealed class ka purpose kya hota hai?"},keys:["sealed","inherit","cannot inherit","prevent inheritance","derived"],required:["sealed","cannot inherit"],answer:{hi:"A sealed class cannot be inherited by another class. It can still inherit from another class.",en:"A sealed class cannot be inherited by another class. It can still inherit from another class.",hinglish:"Sealed class ko koi aur class inherit nahi kar sakti, lekin sealed class khud kisi class se inherit kar sakti hai."},hint:{hi:"Is keyword ka focus inheritance ko rokna hai.",en:"The keyword is specifically about restricting inheritance.",hinglish:"Keyword ka main purpose inheritance ko restrict karna hai."},follow:["interface"]},
{id:"static",topic:"Static Members",level:2,q:{hi:"Static member kis se belong karta hai?",en:"What does a static member belong to?",hinglish:"Static member object se belong karta hai ya class se?"},keys:["class","type","not object","object nahi","shared"],required:["class"],answer:{hi:"A static member belongs to the type or class rather than a particular object, so it is accessed through the class name.",en:"A static member belongs to the type or class rather than a particular object, so it is accessed through the class name.",hinglish:"Static member class/type se belong karta hai, kisi particular object se nahi, aur class name se access hota hai."},hint:{hi:"Static ko object-specific nahi, type-level member samjho.",en:"Think of static as type-level rather than object-specific.",hinglish:"Static ko object-level ke bajay type-level member samjho."},follow:["static-constructor"]},
{id:"static-constructor",topic:"Static Constructor",level:3,q:{hi:"Static constructor kab execute hota hai?",en:"When does a static constructor execute?",hinglish:"Static constructor kab automatically execute hota hai?"},keys:["first use","type initialized","once","before first instance","static data"],required:["first use","once"],answer:{hi:"A static constructor runs automatically once per type, before the type is first used or a static member is accessed, depending on the trigger.",en:"A static constructor runs automatically once per type, before the type is first used or a static member is accessed, depending on the trigger.",hinglish:"Static constructor automatically type ki initialization ke time once run hota hai, first relevant use se pehle."},hint:{hi:"Instance constructor object creation par aata hai; static constructor type initialization se related hai.",en:"Contrast it with an instance constructor: this one is tied to type initialization.",hinglish:"Instance constructor object se related hai; static constructor type initialization se related hai."},follow:["interface"]},
{id:"interface",topic:"Interface",level:2,q:{hi:"Interface kya define karta hai?",en:"What does an interface define?",hinglish:"Interface kya define karta hai?"},keys:["contract","members","implementation","class must","rules"],required:["contract"],answer:{hi:"An interface defines a contract of members that an implementing type agrees to provide.",en:"An interface defines a contract of members that an implementing type agrees to provide.",hinglish:"Interface ek contract define karta hai jise implementing class ko fulfill karna hota hai."},hint:{hi:"Interface ko contract ki tarah socho.",en:"Think of an interface as a contract between the type and its implementation.",hinglish:"Interface ko contract samjho."},follow:["explicit"]},
{id:"explicit",topic:"Explicit Interface Implementation",level:3,q:{hi:"Explicit interface implementation kab useful hoti hai?",en:"When is explicit interface implementation useful?",hinglish:"Explicit interface implementation kab use karte hain?"},keys:["same method","two interfaces","separate implementation","interface reference","explicit"],required:["two interfaces","separate implementation"],answer:{hi:"It is useful when a class implements interfaces that contain the same member and needs separate implementations, accessed through the interface reference.",en:"It is useful when a class implements interfaces that contain the same member and needs separate implementations, accessed through the interface reference.",hinglish:"Jab multiple interfaces mein same member ho aur class ko separate implementations deni ho, tab explicit implementation useful hoti hai."},hint:{hi:"Do interfaces mein same method name ho to separate behavior kaise doge, socho.",en:"Think about two interfaces exposing the same member name but requiring different behavior.",hinglish:"Do interfaces mein same method ho aur behavior alag chahiye, us case ko socho."},follow:["scenario"]},
{id:"var-dynamic",topic:"var vs dynamic",level:3,q:{hi:"var aur dynamic mein main difference kya hai?",en:"What is the main difference between var and dynamic?",hinglish:"var aur dynamic mein main difference kya hai?"},keys:["compile time","runtime","type inferred","dynamic","type checking"],required:["compile time","runtime"],answer:{hi:"var is statically typed with its type inferred at compile time, while dynamic defers member/type checking to runtime.",en:"var is statically typed with its type inferred at compile time, while dynamic defers member/type checking to runtime.",hinglish:"var ka type compile time par infer hota hai, jabki dynamic ki checking runtime par defer hoti hai."},hint:{hi:"Ek compile time aur ek runtime se connected hai.",en:"One is tied to compile time and the other to runtime.",hinglish:"Ek compile time aur doosra runtime se related hai."},follow:["scenario"]},
{id:"conversion",topic:"Type Conversion",level:3,q:{hi:"Implicit aur explicit conversion mein difference kya hai?",en:"What is the difference between implicit and explicit conversion?",hinglish:"Implicit aur explicit conversion mein kya difference hai?"},keys:["implicit","automatic","explicit","cast","data loss","smaller","larger"],required:["implicit","explicit"],answer:{hi:"Implicit conversion is performed automatically when safe, while explicit conversion requires a cast and may involve possible data loss.",en:"Implicit conversion is performed automatically when safe, while explicit conversion requires a cast and may involve possible data loss.",hinglish:"Implicit conversion safe cases mein automatically hota hai; explicit conversion mein cast karna padta hai aur data loss possible ho sakta hai."},hint:{hi:"Safe automatic conversion aur cast wali conversion compare karo.",en:"Compare automatic safe conversion with conversion that requires a cast.",hinglish:"Automatic safe conversion ko cast wali conversion se compare karo."},follow:["scenario"]},
{id:"scenario",topic:"OOP Scenario",level:3,q:{hi:"Aapko aisi system design karni hai jahan different payment methods ka Pay() behavior alag ho. Aap interface ya abstract class mein se kya choose karoge aur kyun?",en:"You are designing a system where different payment methods have different Pay() behavior. Would you choose an interface or an abstract class, and why?",hinglish:"Different payment methods ka Pay() behavior alag hai. Interface ya abstract class mein se kya choose karoge aur kyun?"},keys:["interface","contract","multiple","abstract","shared","implementation","common"],required:["interface"],answer:{hi:"An interface is a strong choice when the goal is a common contract that different payment types implement. An abstract class can be preferable when shared state or common implementation is also needed.",en:"An interface is a strong choice when the goal is a common contract that different payment types implement. An abstract class can be preferable when shared state or common implementation is also needed.",hinglish:"Agar main requirement common Pay contract hai to interface strong choice hai; shared state ya common implementation chahiye ho to abstract class useful ho sakti hai."},hint:{hi:"Sirf contract chahiye ya shared state/implementation bhi? Is distinction par decision lo.",en:"Decide whether you need only a contract or also shared state/common implementation.",hinglish:"Socho sirf contract chahiye ya shared state/implementation bhi chahiye."},follow:[]}
];

let lang="hi-IN", current=null, history=[], used=new Set(), score=0, difficulty=1, submitted=false, recognition=null, listening=false, diagnostic=0;
const $=id=>document.getElementById(id);
const label=()=>LANGS[lang];
const text=(q)=>q[lang]||q.en;

document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{document.querySelectorAll(".mode").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");lang=b.dataset.lang;});
function speak(s){if(!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(s);u.lang=label().voice;u.rate=.91;speechSynthesis.speak(u)}
function clean(s){return (s||"").toLowerCase().replace(/[^a-z0-9\u0900-\u097f\s]/gi," ").replace(/\s+/g," ").trim()}
function hit(answer,key){const a=clean(answer), k=clean(key);if(!k)return false;return a.includes(k)}
function evaluate(q,answer){
  const a=clean(answer);let matched=q.keys.filter(k=>hit(a,k));let required=q.required.filter(k=>hit(a,k));
  let coverage=q.required.length?required.length/q.required.length:matched.length/q.keys.length;
  let status=coverage>=.99?"good":coverage>=.5?"partial":"bad";
  if(q.id==="polymorphism"&&hit(a,"many forms"))status="good";
  if(q.id==="sealed"&&hit(a,"sealed")&&hit(a,"inherit"))status="good";
  const technical=Math.min(1,(matched.length/Math.max(2,Math.ceil(q.keys.length*.5))));
  const points=status==="good"?10:status==="partial"?6:2;
  return {status,matched,required,coverage,points,technical};
}
function missing(q,result){return q.required.filter(k=>!result.required.includes(k)).slice(0,3)}
function feedback(q,result){
  const l=label();const miss=missing(q,result);
  if(result.status==="good")return {title:lang==="en-IN"?"Strong answer ✓":lang==="hinglish"?"Strong answer ✓":"Achha answer ✓",body:lang==="en-IN"?"Your answer covered the key idea. Let's increase the difficulty.":lang==="hinglish"?"Tumne main concept cover kar diya. Ab difficulty increase karte hain.":"Tumne main concept cover kar diya. Ab difficulty badhate hain."};
  if(result.status==="partial")return {title:lang==="en-IN"?"Partially correct — add one more point":lang==="hinglish"?"Partially correct — ek important point missing hai":"Partially correct — ek important point missing hai",body:lang==="en-IN"?"You have the basic idea, but the answer is incomplete. The missing point is: "+miss.join(", "):lang==="hinglish"?"Basic idea sahi hai, lekin answer incomplete hai. Missing point: "+miss.join(", "):"Basic idea sahi hai, lekin answer incomplete hai. Missing point: "+miss.join(", ")};
  return {title:lang==="en-IN"?"Needs correction":lang==="hinglish"?"Answer ko correct karna hai":"Answer ko correct karna hai",body:lang==="en-IN"?"The answer did not cover the core concept. Here is the correct explanation:":lang==="hinglish"?"Core concept miss ho gaya. Correct explanation neeche hai:":"Core concept miss ho gaya. Correct explanation neeche hai:"};
}
let pendingFollowUp = "";
function pickQuestion(){
  if (pendingFollowUp) {
    const follow = pendingFollowUp;
    pendingFollowUp = "";
    current = {
      id: "ai-follow-up-" + history.length,
      topic: "AI Follow-up",
      level: difficulty,
      q: { "hi-IN": follow, "en-IN": follow, "hinglish": follow },
      answer: { "hi-IN": "", "en-IN": "", "hinglish": "" },
      keys: [], required: [], follow: []
    };
    used.add(current.id);
    submitted = false;
    renderQuestion();
    return;
  }
  let available = BANK.filter(q => !used.has(q.id));
  if (!available.length) {
    used = new Set();
    available = BANK.filter(q => !used.has(q.id));
  }
  let pool = available.filter(q => Math.abs(q.level - difficulty) <= 1);
  if (!pool.length) pool = available;
  pool.sort((a,b) => Math.abs(a.level-difficulty)-Math.abs(b.level-difficulty));
  current = pool[Math.floor(Math.random() * Math.min(3,pool.length))];
  used.add(current.id);
  submitted = false;
  renderQuestion();
}
function renderQuestion(){
  const n=history.length+1;$('qno').textContent="Question "+n;$('category').textContent=current.topic;$('level').textContent="Level: "+(difficulty===1?"Beginner":difficulty===2?"Intermediate":"Advanced");$('difficulty').textContent=current.level===3?"Challenge":current.level===2?"Core": "Diagnostic";$('topic').textContent=current.topic;$('question').textContent=text(current.q);$('meter').style.width=(((n-1)%20+1)/20*100)+"%";$('followup').style.display="none";const nextBtn=$('next-question');if(nextBtn)nextBtn.style.display="none";$('feedback').style.display="none";$('feedback').className="live-feedback";$('transcript').textContent="Your spoken answer will appear here...";$('status').textContent=label().listen;$('submit').disabled=false;speak(text(current.q));}
function setupRecognition(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){$('status').textContent="Voice recognition is not supported. Please use Chrome or Edge.";return null}const r=new SR();r.lang=label().voice;r.interimResults=true;r.continuous=false;r.onstart=()=>{listening=true;$('mic').classList.add("listening");$('status').textContent=lang==="en-IN"?"Listening...":"Sun raha hoon..."};r.onresult=e=>{let s="";for(let i=e.resultIndex;i<e.results.length;i++)s+=e.results[i][0].transcript;$('transcript').textContent=s};r.onerror=e=>{$('status').textContent="Voice error: "+e.error;listening=false;$('mic').classList.remove("listening")};r.onend=()=>{listening=false;$('mic').classList.remove("listening");if($('transcript').textContent!=="Your spoken answer will appear here...")$('status').textContent=lang==="en-IN"?"Answer captured.":"Answer capture ho gaya."};return r}
$('start').onclick=()=>{$('setup').classList.add("hidden");$('interview').classList.remove("hidden");speak(label().start);pickQuestion()};
$('finish-session').onclick=()=>{
  if(!history.length){alert(lang==="en-IN"?"Answer at least one question before finishing.":"Pehle kam se kam ek question ka answer do.");return;}
  finish();
};
$('hear').onclick=()=>speak(text(current.q));
$('mic').onclick=()=>{if(listening){recognition&&recognition.stop();return}recognition=setupRecognition();if(recognition)try{recognition.start()}catch(e){}};
$('retry').onclick=()=>{$('transcript').textContent="Your spoken answer will appear here...";$('feedback').style.display="none";$('status').textContent=label().again};
$('submit').onclick = async () => {
  if (submitted) return;
  const ans = $('transcript').textContent;
  if (ans === "Your spoken answer will appear here...") {
    alert(lang === "en-IN" ? "Please answer first." : "Pehle answer boliye.");
    return;
  }
  submitted = true;
  $('submit').disabled = true;
  $('status').textContent = label().thinking;
  try {
    const response = await fetch("https://csharp-oop-quiz-three.vercel.app/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: text(current.q),
        answer: ans,
        language: lang === "hi-IN" ? "Hindi" : lang === "hinglish" ? "Hinglish" : "English",
        level: difficulty === 1 ? "beginner" : difficulty === 2 ? "intermediate" : "advanced"
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "AI evaluation failed");
    const verdict = data.verdict === "correct" ? "good" : data.verdict === "partial" ? "partial" : "bad";
    const result = { status: verdict, points: Number(data.score) || 0, explanation: data.explanation || "", correctAnswer: data.correctAnswer || "", missingPoints: Array.isArray(data.missingPoints) ? data.missingPoints : [] };
    score += result.points;
    history.push({ q: current, a: ans, result });
    const title = verdict === "good"
      ? (lang === "en-IN" ? "Strong answer ✓" : "Achha answer ✓")
      : verdict === "partial"
        ? (lang === "en-IN" ? "Partially correct — improve completeness" : "Partially correct — kuch points missing hain")
        : (lang === "en-IN" ? "Needs correction" : "Answer ko correct karna hai");
    const details = [result.explanation, result.missingPoints.length ? (lang === "en-IN" ? "Missing points: " : "Missing points: ") + result.missingPoints.join("; ") : ""].filter(Boolean).join("\n");
    $('feedback').className = "live-feedback " + verdict;
    $('feedback').innerHTML = '<div class="feedback-title">' + escapeHtml(title) + '</div><div class="feedback-body">' + escapeHtml(details) + '</div><div class="correct-answer"><b>AI correction:</b> ' + escapeHtml(result.correctAnswer || "No correction provided.") + '</div>';
    $('feedback').style.display = "block";
    if (data.nextDifficulty === "advanced") difficulty = 3;
    else if (data.nextDifficulty === "intermediate") difficulty = 2;
    else if (data.nextDifficulty === "beginner") difficulty = 1;
    pendingFollowUp = String(data.followUp || "").trim();
    if (pendingFollowUp) {
      $('followup').textContent = (lang === "en-IN" ? "AI follow-up: " : "AI follow-up: ") + pendingFollowUp;
      $('followup').style.display = "block";
    } else {
      $('followup').style.display = "none";
    }
    $('status').textContent = verdict === "good"
      ? (lang === "en-IN" ? "✓ AI says your answer is correct." : "✓ AI ke hisaab se answer sahi hai.")
      : verdict === "partial"
        ? (lang === "en-IN" ? "AI found a partially correct answer. Review the feedback." : "AI ne answer partially correct bataya. Feedback dekho.")
        : (lang === "en-IN" ? "AI found some errors. Review the correction." : "AI ne kuch errors bataye. Correction dekho.");
    $('submit').disabled = true;
    $('status').textContent += " — " + (lang === "en-IN" ? "Click Next Question when ready." : "Jab ready ho, Next Question dabao.");
    let nextButton = $('next-question');
    if (!nextButton) {
      nextButton = document.createElement("button");
      nextButton.id = "next-question";
      nextButton.type = "button";
      nextButton.textContent = lang === "en-IN" ? "Next Question" : "Agla Question";
      nextButton.style.marginTop = "12px";
      $('feedback').appendChild(nextButton);
    }
    nextButton.textContent = lang === "en-IN" ? "Next Question" : "Agla Question";
    nextButton.style.display = "inline-block";
    nextButton.onclick = () => {
      nextButton.style.display = "none";
      pickQuestion();
    };
  } catch (error) {
    submitted = false;
    $('submit').disabled = false;
    $('status').textContent = "AI connection error: " + error.message;
    $('feedback').className = "live-feedback bad";
    $('feedback').innerHTML = '<div class="feedback-title">AI connection failed</div><div class="feedback-body">' + escapeHtml(error.message) + '</div><div class="correct-answer">Please check the Vercel deployment, API key permissions, and API billing, then try again.</div>';
    $('feedback').style.display = "block";
  }
};
function finish(){
 $('interview').classList.add("hidden");$('result').classList.remove("hidden");const total=history.length*10;const accuracy=Math.round(history.filter(x=>x.result.status==="good").length/history.length*100);const complete=Math.round(history.filter(x=>x.result.status!=="bad").length/history.length*100);const finalScore=Math.round(score/history.length*10);const lvl=finalScore>=80?"Advanced":finalScore>=60?"Intermediate":"Beginner";$('score').textContent=finalScore;$('result-level').textContent=lvl;$('accuracy').textContent=accuracy+"%";$('complete').textContent=complete+"%";$('final-level').textContent=lvl;$('result-msg').textContent=label().done+" "+(lang==="en-IN"?"Your weak and strong areas are visible below.":lang==="hinglish"?"Strong aur weak areas neeche diye gaye hain.":"Strong aur weak areas neeche diye gaye hain.");$('review').innerHTML=history.map((x,i)=>'<div class="review-row '+x.result.status+'"><b>Q'+(i+1)+'. '+x.q.topic+'</b><br><small>'+x.q.q.en+'</small><p><b>Your answer:</b> '+escapeHtml(x.a)+'</p><p><b>'+statusLabel(x.result.status)+'</b> — '+x.q.answer[lang]+'</p></div>').join("");speak(label().done)}
function statusLabel(s){return s==="good"?"Strong answer ✓":s==="partial"?"Partially correct — improve completeness":"Needs correction"}
function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
