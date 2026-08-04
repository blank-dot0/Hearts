const body =
document.body;



function createPetal(){


const petal =
document.createElement("div");


petal.className="petal";



petal.style.left =
Math.random()*100+"%";


petal.style.animationDuration =
(5+Math.random()*5)+"s";


document.body.appendChild(petal);



setTimeout(()=>{

petal.remove();

},10000);



}



setInterval(createPetal,400);
