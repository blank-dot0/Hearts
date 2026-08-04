const sparkleBox =
document.getElementById("sparkles");


function createSparkle(){


let s =
document.createElement("div");


s.className="sparkle";


s.style.left =
Math.random()*100+"%";


s.style.animationDuration =
(3+Math.random()*5)+"s";


sparkleBox.appendChild(s);



setTimeout(()=>{

s.remove();

},8000);


}



setInterval(createSparkle,200);
