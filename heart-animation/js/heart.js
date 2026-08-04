const canvas =
document.getElementById("heartCanvas");


const ctx =
canvas.getContext("2d");


canvas.width =
innerWidth;

canvas.height =
innerHeight;



let particles=[];


let rotation = 0;


let formed=false;



function heartShape(t){


return {

x:
16*Math.pow(Math.sin(t),3),


y:
-(13*Math.cos(t)
-5*Math.cos(2*t)
-2*Math.cos(3*t)
-Math.cos(4*t))

};

}




// Create particles


for(let i=0;i<4000;i++){


let t =
Math.random()*Math.PI*2;


let point =
heartShape(t);



particles.push({


x:
Math.random()*canvas.width,


y:
Math.random()*canvas.height,


tx:
canvas.width/2+
point.x*15,


ty:
canvas.height/2+
point.y*15,


size:
Math.random()*2+1,


speed:
Math.random()*0.04+0.02


});


}




function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach(p=>{


p.x +=
(p.tx-p.x)*p.speed;


p.y +=
(p.ty-p.y)*p.speed;



ctx.beginPath();


ctx.arc(

p.x,

p.y,

p.size,

0,

Math.PI*2

);



ctx.fillStyle="#ff5fa8";


ctx.shadowBlur=20;

ctx.shadowColor="#ff5fa8";


ctx.fill();


});



requestAnimationFrame(animate);


}



animate();




// After heart completion


setTimeout(()=>{


formed=true;


document
.getElementById("heartCanvas")
.classList.add("heartGlow");



document
.getElementById("message")
.classList.add("show");



},7000);




// Resize support


window.addEventListener(
"resize",
()=>{

canvas.width=innerWidth;
canvas.height=innerHeight;

});
