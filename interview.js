const banks={
  "hi-IN":[
    ["C# Basics","C# mein object banane ke liye kaunsa keyword use hota hai?",["new","object","class"],["new","न्यू"]],
    ["Class & Object","Class aur object mein kya difference hai?",["blueprint","template","instance","class"],["blueprint","template","instance","class"]],
    ["Constructor","Constructor kya hota hai?",["special member","object create","same name","return type"],["special member","object","create","class name","no return"]],
    ["Constructor","Constructor ko overload kar sakte hain?",["multiple constructors","different parameters","overloading"],["multiple","different parameter","overload"]],
    ["this keyword","this keyword ka use kis liye hota hai?",["current object","current instance","class object"],["current object","current instance"]],
    ["Inheritance","Inheritance kya hota hai?",["derived class","base class","reuse","inherit"],["derived","base","reuse","inherit"]],
    ["Polymorphism","Polymorphism ka simple meaning kya hai?",["many forms","different implementation","same interface"],["many forms","different implementation","different forms"]],
    ["Abstract Class","Abstract class ko directly instantiate kar sakte hain?",["no","cannot instantiate","direct object"],["no","cannot","instantiate"]],
    ["Interface","Interface kya define karta hai?",["contract","rules","members"],["contract","rules","members"]],
    ["Static","Static member kis se belong karta hai?",["class","type","object nahi"],["class","type","not object","object nahi"]]
  ],
  "en-IN":[
    ["C# Basics","Which keyword is used to create an object in C#?",["new","object","class"],["new"]],
    ["Class & Object","What is the difference between a class and an object?",["blueprint","template","instance","class"],["blueprint","template","instance","class"]],
    ["Constructor","What is a constructor?",["special member","object created","same name","no return type"],["special member","object","created","class name","no return"]],
    ["Constructor","Can a constructor be overloaded?",["multiple constructors","different parameters","overloading"],["multiple","different parameter","overload"]],
    ["this keyword","Why do we use the this keyword?",["current object","current instance"],["current object","current instance"]],
    ["Inheritance","What is inheritance in C#?",["derived class","base class","reuse","inherit"],["derived","base","reuse","inherit"]],
    ["Polymorphism","What does polymorphism mean?",["many forms","different implementation","same interface"],["many forms","different implementation","different forms"]],
    ["Abstract Class","Can an abstract class be instantiated directly?",["no","cannot instantiate","direct object"],["no","cannot","instantiate"]],
    ["Interface","What is an interface?",["contract","rules","members"],["contract","rules","members"]],
    ["Static","What does a static member belong to?",["class","type","not object"],["class","type","not object"]]
  ]
};
const speechMap={
  "hi-IN":{greet:"नमस्ते। आपका C# voice interview शुरू करते हैं।",done:"बहुत बढ़िया। आपका interview पूरा हो गया है।"},
  "en-IN":{greet:"Hello. Let's start your C sharp voice interview.",done:"Great. Your interview is complete."}
};
let selectedLang="hi-IN", questions=banks[selectedLang], current=0, score=0, answers=[], recognition=null, listening=false;

const $=id=>document.getElementById(id);
document.querySelectorAll(".lang-btn").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".lang-btn").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedLang=btn.dataset.lang;
  questions=banks[selectedLang];
});
function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang=selectedLang;
  u.rate=0.92;
  speechSynthesis.speak(u);
}
function normalize(s){return s.toLowerCase().replace(/[^a-z0-9\u0900-\u097f\s]/gi," ");}
function evaluate(answer, expected){
  const a=normalize(answer);
  let hits=0;
  expected.forEach(k=>{if(a.includes(normalize(k))) hits++;});
  return hits>=Math.max(1,Math.ceil(expected.length*0.34));
}
function renderQuestion(){
  const q=questions[current];
  $("q-progress").textContent="Question "+(current+1)+" of "+questions.length;
  $("q-score").textContent="Score: "+score;
  $("q-bar").style.width=((current+1)/questions.length*100)+"%";
  $("question").textContent=q[1];
  $("category").textContent=q[0];
  $("transcript").textContent="Your spoken answer will appear here...";
  $("status").textContent=selectedLang==="hi-IN"?"Mic दबाकर answer बोलिए.":"Press the microphone and answer.";
  $("next-question").textContent=current===questions.length-1?"Finish Interview":"Next Question";
  speak(q[1]);
}
function setupRecognition(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){
    $("status").textContent="Voice recognition is not supported in this browser. Please use Chrome or Edge.";
    return null;
  }
  const r=new SR();
  r.lang=selectedLang;
  r.interimResults=true;
  r.continuous=false;
  r.onstart=()=>{listening=true;$("mic-btn").classList.add("listening");$("status").textContent=selectedLang==="hi-IN"?"Sun raha hoon... boliye.":"Listening... speak now.";};
  r.onresult=e=>{
    let text="";
    for(let i=e.resultIndex;i<e.results.length;i++) text+=e.results[i][0].transcript;
    $("transcript").textContent=text;
  };
  r.onerror=e=>{$("status").textContent="Microphone/voice error: "+e.error+". Try again.";listening=false;$("mic-btn").classList.remove("listening");};
  r.onend=()=>{listening=false;$("mic-btn").classList.remove("listening");if($("transcript").textContent!=="Your spoken answer will appear here...") $("status").textContent="Answer captured. You can continue.";};
  return r;
}
$("start-interview").onclick=()=>{
  $("setup").classList.add("hidden");$("interview").classList.remove("hidden");
  speak(speechMap[selectedLang].greet);
  renderQuestion();
};
$("speak-btn").onclick=()=>speak(questions[current][1]);
$("mic-btn").onclick=()=>{
  if(listening){recognition&&recognition.stop();return;}
  recognition=setupRecognition();
  if(recognition){try{recognition.start()}catch(e){}}
};
$("retry-speech").onclick=()=>{if(recognition&&listening)recognition.stop();$("transcript").textContent="Your spoken answer will appear here...";$("status").textContent=selectedLang==="hi-IN"?"Phir se mic दबाकर boliye.":"Press the microphone and try again.";};
$("next-question").onclick=()=>{
  const answer=$("transcript").textContent;
  if(answer==="Your spoken answer will appear here..."){alert(selectedLang==="hi-IN"?"Pehle answer boliye.":"Please answer using the microphone.");return;}
  const ok=evaluate(answer,questions[current][3]);
  if(ok) score++;
  answers.push({question:questions[current][1],answer,ok});
  if(current<questions.length-1){current++;renderQuestion();}
  else{
    $("interview").classList.add("hidden");$("result").classList.remove("hidden");
    $("final-score").textContent=score;
    $("final-message").textContent=(selectedLang==="hi-IN"?speechMap["hi-IN"].done+" ":"Great. Your interview is complete. ")+score+" / "+questions.length;
    $("interview-review").innerHTML=answers.map((x,i)=>'<div class="feedback '+(x.ok?"good":"needs")+'"><b>Q'+(i+1)+'.</b> '+(x.ok?"Good answer":"Needs improvement")+'<br><span class="small">Your answer: '+x.answer.replace(/</g,"&lt;")+'</span></div>').join("");
    speak(speechMap[selectedLang].done);
  }
};
