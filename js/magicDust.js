const dustBox =
document.getElementById("magicDust");


function dust(){


let d =
document.createElement("div");


d.className="dust";


d.style.left =
Math.random()*100+"%";


d.style.animationDuration =
(4+Math.random()*5)+"s";


dustBox.appendChild(d);



setTimeout(()=>{

d.remove();

},9000);


}



setInterval(dust,250);
