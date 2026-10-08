const questions=[
["C# Basics", "Which keyword is used to create an object in C#?", ["new","class","object","create"], 2],
["C# Basics", "Which of the following is a reference type?", ["int","double","class","bool"], 3],
["C# Basics", "What is the main purpose of a namespace?", ["To store variables only","To organize related types","To create objects","To execute methods"], 2],
["C# Basics", "Which keyword allows a variable's type to be inferred at compile time?", ["dynamic","var","object","type"], 2],
["C# Basics", "Which keyword supports dynamic type checking at runtime?", ["var","dynamic","static","readonly"], 2],
["C# Basics", "What is an object?", ["A blueprint","An instance of a class","A namespace","A method"], 2],
["Constructor & OOP", "What is a constructor?", ["A method with a return type","A special member called when an object is created","A namespace","A variable"], 2],
["Constructor & OOP", "A constructor must have the same name as the:", ["namespace","method","class","object"], 3],
["Constructor & OOP", "What does a constructor NOT have?", ["Parameters","Access modifier","Return type","Class name"], 3],
["Constructor & OOP", "What is constructor overloading?", ["Multiple classes","Multiple constructors with different parameter lists","Overriding a constructor","Deleting a constructor"], 2],
["Constructor & OOP", "Which keyword refers to the current object?", ["base","this","self","current"], 2],
["Constructor & OOP", "What is method overloading?", ["Same method name with different parameter lists","Same parameter list in different classes","Changing a variable","Creating an object"], 1],
["Abstract, Sealed & Static", "Which keyword is used to declare an abstract class?", ["virtual","abstract","interface","base"], 2],
["Abstract, Sealed & Static", "Can an abstract class be instantiated directly?", ["Yes","No","Only with static","Only with sealed"], 2],
["Abstract, Sealed & Static", "Which keyword prevents a class from being inherited?", ["abstract","static","sealed","private"], 3],
["Abstract, Sealed & Static", "A static member belongs to the:", ["object only","class rather than a particular object","namespace only","constructor only"], 2],
["Abstract, Sealed & Static", "How many times does a static constructor execute for a type?", ["Every object creation","Twice","Once per type initialization","Never"], 3],
["Abstract, Sealed & Static", "Which statement about a static class is correct?", ["It can be instantiated","It can contain instance members","It cannot be instantiated","It must inherit a class"], 3],
["Partial Class & Interface", "Which keyword is used to split a class into multiple files?", ["split","partial","multiple","part"], 2],
["Partial Class & Interface", "What is an interface primarily used to define?", ["A contract","A constructor","A namespace","A database"], 1],
["Partial Class & Interface", "Which keyword is used when a class implements an interface?", ["inherits","implements","class","The interface name after ':'"], 4],
["Partial Class & Interface", "Can a class implement multiple interfaces?", ["Yes","No","Only two","Only one"], 1],
["Partial Class & Interface", "What is explicit interface implementation useful for?", ["Giving interface members a specific implementation accessed through the interface","Creating namespaces","Preventing inheritance","Creating constructors"], 1],
["Partial Class & Interface", "Can an interface contain a constructor?", ["Yes","No","Only static","Only private"], 2],
["Boss Round", "Which OOP principle allows one interface/base type to represent different derived implementations?", ["Encapsulation","Polymorphism","Compilation","Namespace"], 2],
["Boss Round", "Which keyword is commonly used to override a virtual member?", ["new","override","overload","extends"], 2],
["Boss Round", "Which conversion requires an explicit cast when converting a larger numeric type to a smaller numeric type?", ["Implicit conversion","Explicit conversion","Boxing only","Reference conversion"], 2],
["Boss Round", "Where are value types generally stored when they are local variables?", ["Heap only","Stack (in typical local-variable cases)","Database","Namespace"], 2],
["Boss Round", "Which member can initialize an object when it is created?", ["Constructor","Namespace","Interface","Assembly"], 1],
["Boss Round", "Which statement best describes a class?", ["An instance of an object","A blueprint/template for creating objects","A method parameter","A runtime exception"], 2]
];

const answers=[2,3,2,2,2,2,2,3,3,2,2,1,2,2,3,2,3,3,2,1,4,1,1,2,2,2,2,2,1,2];
let current=0, selected=Array(questions.length).fill(null);

const form=document.getElementById("quiz-form");
questions.forEach((q,i)=>{
  const section=document.createElement("section");
  section.className="question"+(i===0?" active":"");
  section.dataset.index=i;
  section.innerHTML="<h3>Q"+(i+1)+". "+q[1]+"</h3>"+q[2].map((o,j)=>'<label class="option"><input type="radio" name="q'+i+'" value="'+(j+1)+'"> '+String.fromCharCode(65+j)+". "+o+"</label>").join("");
  form.appendChild(section);
  section.querySelectorAll("input").forEach(input=>input.addEventListener("change",()=>{if(selected[i]!==null)return;selected[i]=Number(input.value);section.querySelectorAll("input").forEach(r=>r.disabled=true);section.classList.add("locked");updateLive()}));
});

function updateLive(){
  let score=selected.reduce((s,v,i)=>s+(v===answers[i]?1:0),0);
  document.getElementById("score-live").textContent="Score: "+score;
}
function showQuestion(){
  document.querySelectorAll(".question").forEach((el,i)=>el.classList.toggle("active",i===current));
  document.getElementById("progress").textContent="Question "+(current+1)+" of "+questions.length;
  document.getElementById("progress-bar").style.width=((current+1)/questions.length*100)+"%";
  document.getElementById("prev-btn").disabled=current===0;
  document.getElementById("next-btn").classList.toggle("hidden",current===questions.length-1);
  document.getElementById("submit-btn").classList.toggle("hidden",current!==questions.length-1);
}
document.getElementById("start-btn").onclick=()=>{document.getElementById("start-screen").classList.add("hidden");document.getElementById("quiz-screen").classList.remove("hidden");showQuestion()};
document.getElementById("prev-btn").onclick=()=>{if(current>0){current--;showQuestion()}};
document.getElementById("next-btn").onclick=()=>{if(selected[current]===null){alert("Please select an answer first.");return}current++;showQuestion()};
document.getElementById("submit-btn").onclick=()=>{
  if(selected[current]===null){alert("Please select an answer first.");return}
  let score=selected.reduce((s,v,i)=>s+(v===answers[i]?1:0),0);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent=score;
  document.getElementById("result-title").textContent=score>=24?"Excellent Work!":score>=18?"Good Job!":score>=12?"Keep Practicing!":"Revise OOP Concepts";
  document.getElementById("result-message").textContent="You scored "+score+" out of 30.";
  document.getElementById("answer-review").innerHTML=questions.map((q,i)=>{
    const ok=selected[i]===answers[i];
    return '<div class="review-item '+(ok?"correct":"wrong")+'"><b>Q'+(i+1)+'.</b> '+(ok?"Correct":"Incorrect")+" • Your answer: "+(selected[i]?q[2][selected[i]-1]:"Not answered")+" • Correct: "+q[2][answers[i]-1]+"</div>";
  }).join("");
};
document.getElementById("retry-btn").onclick=()=>location.reload();
