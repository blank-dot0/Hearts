// ======================================
// PARTICLE TEXT ENGINE
// Hi My Princess 🩷
// ======================================


const textCanvas =
document.getElementById("textCanvas");


const textCtx =
textCanvas.getContext("2d");



let textParticles = [];



function resizeTextCanvas(){

textCanvas.width =
window.innerWidth;

textCanvas.height =
window.innerHeight;

}


resizeTextCanvas();

window.addEventListener(
"resize",
resizeTextCanvas
);




// Create text particles


function createText(){


textCtx.clearRect(
0,
0,
textCanvas.width,
textCanvas.height
);



let fontSize =
window.innerWidth < 600
? 35
: 60;



textCtx.font =
`bold ${fontSize}px Poppins`;



textCtx.textAlign="center";

textCtx.fillStyle="white";



textCtx.fillText(

"Hi My Princess 🩷",

textCanvas.width/2,

textCanvas.height/2

);





let pixels =
textCtx.getImageData(

0,

0,

textCanvas.width,

textCanvas.height

).data;



textParticles=[];



for(
let y=0;
y<textCanvas.height;
y+=4
){


for(
let x=0;
x<textCanvas.width;
x+=4
){



let index =
(y*textCanvas.width+x)*4;



if(pixels[index+3]>0){



textParticles.push({


x:
Math.random()*textCanvas.width,


y:
Math.random()*textCanvas.height,


targetX:x,


targetY:y,


size:
Math.random()*2+1,


speed:
0.04+
Math.random()*0.05



});



}



}



}




textCtx.clearRect(
0,
0,
textCanvas.width,
textCanvas.height
);


}





// Animate


function animateText(){


textCtx.clearRect(
0,
0,
textCanvas.width,
textCanvas.height
);



textParticles.forEach(p=>{


p.x +=
(p.targetX-p.x)
*p.speed;


p.y +=
(p.targetY-p.y)
*p.speed;



textCtx.beginPath();



textCtx.arc(

p.x,

p.y,

p.size,

0,

Math.PI*2

);



textCtx.fillStyle=
"#ff75b7";



textCtx.shadowBlur=15;

textCtx.shadowColor=
"#ff1493";



textCtx.fill();



});



requestAnimationFrame(
animateText
);


}





// Start after heart


setTimeout(()=>{


createText();


animateText();



},7000);
