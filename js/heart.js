// ==========================================
// PREMIUM ROMANTIC FLOWING PARTICLE HEART
// ==========================================


const canvas =
document.getElementById("heartCanvas");


const ctx =
canvas.getContext("2d");



let width;
let height;


let particles = [];


let startTime =
performance.now();


let heartFormed = false;




// ==========================================
// CANVAS RESIZE
// ==========================================


function resizeCanvas(){


    const rect =
    canvas.getBoundingClientRect();



    const dpr =
    Math.min(
        window.devicePixelRatio || 1,
        1.5
    );



    width =
    rect.width;


    height =
    rect.height;



    canvas.width =
    width*dpr;


    canvas.height =
    height*dpr;



    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}



// ==========================================
// HEART EQUATION
// ==========================================


function heartPoint(t){


    return {


        x:
        16*
        Math.pow(
            Math.sin(t),
            3
        ),



        y:
        13*Math.cos(t)
        -
        5*Math.cos(2*t)
        -
        2*Math.cos(3*t)
        -
        Math.cos(4*t)

    };


}





// ==========================================
// CREATE FLOWING PARTICLES
// ==========================================


function createParticles(){


    particles=[];



    const mobile =
    window.innerWidth < 600;



    const amount =
    mobile ? 1200 : 2500;



    const scale =
    Math.min(
        width,
        height
    )/40;



    for(
        let i=0;
        i<amount;
        i++
    ){



        const angle =
        Math.random()
        *
        Math.PI*2;



        const heart =
        heartPoint(angle);



        const targetX =
        heart.x*
        scale;



        const targetY =
        -heart.y*
        scale;



        const targetZ =
        Math.random()*80-40;



        // particles start everywhere


        const startX =
        (Math.random()*width)
        -
        width/2;



        const startY =
        (Math.random()*height)
        -
        height/2;



        const startZ =
        Math.random()*400-200;



        particles.push({


            x:startX,

            y:startY,

            z:startZ,


            tx:targetX,

            ty:targetY,

            tz:targetZ,



            size:
            mobile
            ?
            Math.random()*1.8+0.5
            :
            Math.random()*2.5+0.7,



            speed:
            0.035+
            Math.random()*0.05,



            alpha:
            0.5+
            Math.random()*0.5,



            delay:
            Math.random()*1200


        });


    }


}
// ==========================================
// PARTICLE FLOW + HEART FORMATION
// ==========================================


function animate(time){


    ctx.clearRect(
        0,
        0,
        width,
        height
    );



    const elapsed =
    time-startTime;



    // ======================================
    // PARTICLES MOVE INTO HEART
    // ======================================


    particles.forEach(p=>{


        if(elapsed > p.delay){


            p.x +=
            (p.tx-p.x)
            *
            p.speed;



            p.y +=
            (p.ty-p.y)
            *
            p.speed;



            p.z +=
            (p.tz-p.z)
            *
            p.speed;



        }


    });




    if(elapsed > 3500){

        heartFormed=true;

    }




    // ======================================
    // HEART BEAT EFFECT
    // ======================================


    let beat=1;



    if(heartFormed){


        beat =
        1+
        Math.sin(
            elapsed*0.006
        )
        *
        0.035;


    }





    // ======================================
    // DRAW PARTICLES
    // ======================================


    particles.forEach(p=>{


        const perspective =
        600/
        (600+p.z);



        const x =
        width/2
        +
        p.x*
        perspective*
        beat;



        const y =
        height/2
        +
        p.y*
        perspective*
        beat;




        const size =
        Math.max(
            .5,
            p.size*
            perspective
        );



        ctx.beginPath();



        ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI*2
        );



        ctx.fillStyle =

        `rgba(
        255,
        ${40+Math.random()*80},
        ${120+Math.random()*80},
        ${p.alpha}
        )`;



        ctx.shadowBlur =
        12;



        ctx.shadowColor =
        "#ff8bb5";



        ctx.fill();



    });



    requestAnimationFrame(
        animate
    );


}




// ==========================================
// MESSAGE APPEARS AFTER HEART
// ==========================================


setTimeout(()=>{


    const message =
    document.getElementById(
        "heartMessage"
    );



    if(message){


        message.classList.add(
            "show"
        );


    }


},4300);





// ==========================================
// START ENGINE
// ==========================================


resizeCanvas();


createParticles();


requestAnimationFrame(
    animate
);
// ==========================================
// FLOATING HEART PARTICLES
// ==========================================


const floatingBox =
document.getElementById(
    "floatingHearts"
);



function createFloatingHeart(){


    if(!floatingBox)
    return;



    const heart =
    document.createElement(
        "span"
    );


    heart.className =
    "floating-heart";


    heart.innerHTML =
    Math.random()>0.5
    ?
    "♥"
    :
    "♡";



    heart.style.left =
    Math.random()*100+
    "vw";



    heart.style.bottom =
    "-30px";



    heart.style.fontSize =
    (
        10+
        Math.random()*20
    )
    +
    "px";



    heart.style.animationDuration =
    (
        6+
        Math.random()*5
    )
    +
    "s";



    floatingBox.appendChild(
        heart
    );



    setTimeout(()=>{

        heart.remove();

    },12000);


}



setInterval(
    createFloatingHeart,
    900
);





// ==========================================
// GLOWING SPARKLES
// ==========================================


const sparkleBox =
document.getElementById(
    "sparkles"
);



function createSparkle(){


    if(!sparkleBox)
    return;



    const sparkle =
    document.createElement(
        "span"
    );


    sparkle.className =
    "sparkle";



    sparkle.style.left =
    Math.random()*100+
    "%";



    sparkle.style.top =
    Math.random()*100+
    "%";



    sparkleBox.appendChild(
        sparkle
    );



    setTimeout(()=>{

        sparkle.remove();

    },3000);


}



setInterval(
    createSparkle,
    500
);





// ==========================================
// REAL FLOWER PETALS
// ==========================================


const petalContainer =
document.getElementById(
    "petalContainer"
);



function createPetal(){


    if(!petalContainer)
    return;



    const chance =
    Math.random();



    const petal =
    document.createElement(
        "div"
    );



    // 70% cherry blossom

    if(chance < 0.70){


        petal.className =
        "petal cherry";


    }


    // 20% rose petals

    else if(chance < 0.90){


        petal.className =
        "petal rose";


    }


    // 10% glowing particles

    else{


        petal.className =
        "sparklePetal";


    }




    petal.style.left =
    Math.random()*100+
    "vw";



    petal.style.animationDuration =
    (
        7+
        Math.random()*6
    )
    +
    "s";



    petalContainer.appendChild(
        petal
    );



    setTimeout(()=>{


        petal.remove();


    },15000);


}





// Start petals after heart appears

setTimeout(()=>{


    setInterval(
        createPetal,
        250
    );


},4500);





// ==========================================
// MUSIC BUTTON
// ==========================================


const music =
document.getElementById(
    "bgMusic"
);



const musicButton =
document.getElementById(
    "musicButton"
);



let playing=false;



if(musicButton){


musicButton.onclick =
async ()=>{


    if(!playing){


        try{


            await music.play();


            playing=true;


            musicButton.innerHTML =
            "♫ Playing";


        }

        catch(e){

            console.log(e);

        }


    }

    else{


        music.pause();


        playing=false;


        musicButton.innerHTML =
        "♪ Music";


    }


};


}





// ==========================================
// MOBILE OPTIMIZATION
// ==========================================


let timer;



window.addEventListener(
"resize",
()=>{


clearTimeout(timer);



timer =
setTimeout(()=>{


resizeCanvas();


createParticles();


startTime =
performance.now();



},300);



});
