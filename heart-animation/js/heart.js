// =================================
// PARTICLE HEART ENGINE
// =================================


const canvas =
document.getElementById("heartCanvas");


const ctx =
canvas.getContext("2d");



canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;



let particles=[];



// Heart equation

function heartShape(t){


let x =
16*Math.pow(Math.sin(t),3);



let y =
13*Math.cos(t)
-5*Math.cos(2*t)
-2*Math.cos(3*t)
-Math.cos(4*t);



return {

x:x*15,

y:-y*15

};


}




// Create particles


for(let i=0;i<2500;i++){


let point =
heartShape(
Math.random()*Math.PI*2
);



particles.push({


x:
Math.random()*canvas.width,


y:
Math.random()*canvas.height,


targetX:
canvas.width/2+point.x,


targetY:
canvas.height/2+point.y,


size:
Math.random()*2+1,


speed:
Math.random()*0.03+0.01



});


}




// Animation


function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach(p=>{


p.x +=
(p.targetX-p.x)*p.speed;



p.y +=
(p.targetY-p.y)*p.speed;



ctx.beginPath();


ctx.arc(

p.x,

p.y,

p.size,

0,

Math.PI*2

);



ctx.fillStyle =
"#ff5fa8";


ctx.shadowBlur=15;

ctx.shadowColor="#ff5fa8";


ctx.fill();



});



requestAnimationFrame(animate);


}



animate();





// Show message after heart forms


setTimeout(()=>{


document
.getElementById("message")
.classList.add("show");


},6500);
