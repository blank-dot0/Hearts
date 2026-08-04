// ==========================================
// 3D PARTICLE HEART ENGINE
// Optimized Version
// ==========================================


const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");


let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;


// Adaptive particle count
let particleCount = 
window.innerWidth < 600 ? 1800 : 3500;


let particles = [];

let rotationY = 0;

let startTime = Date.now();



// ==========================================
// HEART 3D EQUATION
// ==========================================


function createHeartPoint(t){


    let x =
    16 * Math.pow(Math.sin(t),3);


    let y =
    13 * Math.cos(t)
    -5 * Math.cos(2*t)
    -2 * Math.cos(3*t)
    -Math.cos(4*t);



    return {

        x:x,

        y:y,

        z:
        (Math.random()-0.5)*8

    };

}





// ==========================================
// CREATE PARTICLES
// ==========================================


for(let i=0;i<particleCount;i++){


    let point =
    createHeartPoint(
        Math.random()*Math.PI*2
    );



    let depth =
    Math.random()*40-20;



    particles.push({


        // starting position

        x:
        Math.random()*width,


        y:
        Math.random()*height,


        z:
        depth,



        // heart position

        targetX:
        width/2 + point.x*14,


        targetY:
        height/2 - point.y*14,


        targetZ:
        point.z,



        size:
        Math.random()*2+0.8,



        speed:
        0.02+
        Math.random()*0.04



    });


}






// ==========================================
// ANIMATION
// ==========================================


function animate(){



ctx.clearRect(
0,
0,
width,
height
);





// smooth 360 rotation

rotationY += 0.008;





let pulse =
1+
Math.sin(
(Date.now()-startTime)*0.003
)*0.04;





particles.forEach(p=>{



    // Move particles into heart


    p.x +=
    (p.targetX-p.x)
    *p.speed;



    p.y +=
    (p.targetY-p.y)
    *p.speed;






    // 3D rotation


    let rotatedX =

    p.targetX-width/2;



    let rotatedZ =

    p.targetZ;





    let x3D =

    rotatedX *
    Math.cos(rotationY)
    -
    rotatedZ *
    Math.sin(rotationY);





    let z3D =

    rotatedX *
    Math.sin(rotationY)
    +
    rotatedZ *
    Math.cos(rotationY);






    // Perspective depth


    let perspective =

    500 /
    (500+z3D);





    let finalX =

    width/2
    +
    x3D *
    perspective *
    pulse;





    let finalY =

    height/2
    +
    (p.targetY-height/2)
    *
    perspective *
    pulse;







    ctx.beginPath();



    ctx.arc(

        finalX,

        finalY,

        p.size,

        0,

        Math.PI*2

    );





    ctx.fillStyle =

    "#ff5fa8";





    ctx.shadowBlur = 18;

    ctx.shadowColor =
    "#ff8fc8";





    ctx.fill();




});




requestAnimationFrame(animate);



}



animate();







// ==========================================
// RESPONSIVE RESIZE
// ==========================================


window.addEventListener(
"resize",
()=>{


width =
canvas.width =
window.innerWidth;



height =
canvas.height =
window.innerHeight;



});






// ==========================================
// SHOW TEXT AFTER HEART COMPLETES
// ==========================================


setTimeout(()=>{


const message =
document.getElementById("message");


if(message){

message.classList.add("show");

}


},6500);
