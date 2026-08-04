const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;


let particles = [];

let heartComplete = false;

let rotation = 0;

let scale = 1;



// Heart equation

function heart(t){

    return {

        x:16*Math.pow(Math.sin(t),3),

        y:
        -(13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t))

    };

}



// Create particles

for(let i=0;i<5000;i++){


    let point =
    heart(Math.random()*Math.PI*2);



    particles.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,


        targetX:
        canvas.width/2 + point.x*14,


        targetY:
        canvas.height/2 + point.y*14,


        size:
        Math.random()*2+1,


        speed:
        0.02 + Math.random()*0.04

    });


}




function draw(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



rotation += 0.002;



scale =
1 + Math.sin(Date.now()*0.003)*0.03;



particles.forEach(p=>{


    let dx =
    p.targetX-p.x;


    let dy =
    p.targetY-p.y;


    p.x += dx*p.speed;

    p.y += dy*p.speed;



    // 3D rotation effect

    let centerX =
    canvas.width/2;


    let centerY =
    canvas.height/2;



    let x =
    (p.x-centerX)
    *Math.cos(rotation)
    -
    (p.y-centerY)
    *Math.sin(rotation);



    let y =
    (p.x-centerX)
    *Math.sin(rotation)
    +
    (p.y-centerY)
    *Math.cos(rotation);



    ctx.beginPath();


    ctx.arc(

        centerX+x*scale,

        centerY+y*scale,

        p.size,

        0,

        Math.PI*2

    );


    ctx.fillStyle="#ff5fa8";


    ctx.shadowBlur=20;

    ctx.shadowColor="#ff8fc8";


    ctx.fill();



});



requestAnimationFrame(draw);


}



draw();





// Show text after heart rotation


setTimeout(()=>{


heartComplete=true;



document
.getElementById("message")
.classList.add("show");



},9000);





window.addEventListener(
"resize",
()=>{

canvas.width=innerWidth;

canvas.height=innerHeight;

});
