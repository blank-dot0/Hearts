document.addEventListener(
"pointermove",
(e)=>{


let glow =
document.createElement("div");


glow.className="dust";


glow.style.left =
e.clientX+"px";


glow.style.top =
e.clientY+"px";


document.body.appendChild(glow);



setTimeout(()=>{

glow.remove();

},1000);



});
