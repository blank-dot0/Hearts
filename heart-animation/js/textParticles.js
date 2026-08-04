const textCanvas =
document.getElementById("textCanvas");


const textCtx =
textCanvas.getContext("2d");


textCanvas.width =
innerWidth;


textCanvas.height =
innerHeight;



let textParticles=[];



// Text particle creation


function createTextParticles(){


textCtx.clearRect(
0,
0,
textCanvas.width,
textCanvas.height
);



textCtx.font =
"bold 70px Poppins";


textCtx.fillStyle="white";



textCtx.textAlign="center";


textCtx.fillText(

"Hi My Princess 🩷",

textCanvas.width/2,

textCanvas.height/2

);



let data =
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
y+=5
){


for(
let x=0;
x<textCanvas.width;
x+=5
){


let index =
(y*textCanvas.width+x)*4;



if(data[index+3]>0){


textParticles.push({


x:
Math.random()*textCanvas.width,


y:
Math.random()*textCanvas.height,



tx:x,


ty:y,


size:2,


speed:
0.03+Math.random()*0.05


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



function animateText(){


textCtx.clearRect(

0,

0,

textCanvas.width,

textCanvas.height

);



textParticles.forEach(p=>{


p.x +=
(p.tx-p.x)*p.speed;


p.y +=
(p.ty-p.y)*p.speed;



textCtx.beginPath();


textCtx.arc(

p.x,

p.y,

p.size,

0,

Math.PI*2

);



textCtx.fillStyle="#ff72b6";


textCtx.shadowBlur=15;


textCtx.shadowColor="#ff4fa0";


textCtx.fill();



});



requestAnimationFrame(
animateText
);



}



// Start after heart

setTimeout(()=>{


createTextParticles();


animateText();



},9500);





window.addEventListener(

"resize",

()=>{


textCanvas.width=innerWidth;

textCanvas.height=innerHeight;


});
