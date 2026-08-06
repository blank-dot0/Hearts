// ==========================================
// ROMANTIC PARTICLE HEART ENGINE
// FINAL VERSION
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


let formed = false;



// ==========================================
// CANVAS SETUP
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
    width * dpr;


    canvas.height =
    height * dpr;



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
// HEART MATHEMATICAL SHAPE
// ==========================================


function heartPoint(t){


    const x =
    16 *
    Math.pow(
        Math.sin(t),
        3
    );



    const y =
    13 * Math.cos(t)
    -5 * Math.cos(2*t)
    -2 * Math.cos(3*t)
    -Math.cos(4*t);



    return {
        x,
        y
    };

}



// ==========================================
// CREATE PARTICLES
// ==========================================


function createParticles(){


    particles = [];



    const mobile =
    window.innerWidth < 600;



    const amount =
    mobile ? 1800 : 3200;



    const scale =
    Math.min(
        width,
        height
    ) / 40;



    for(
        let i=0;
        i<amount;
        i++
    ){


        const t =
        Math.random()
        *
        Math.PI
        *
        2;



        const heart =
        heartPoint(t);



        const depth =
        (Math.random()-0.5)
        *
        scale
        *
        6;



        const targetX =
        heart.x * scale
        +
        (Math.random()-0.5)
        * 12;



        const targetY =
        -heart.y * scale
        +
        (Math.random()-0.5)
        * 12;



        const targetZ =
        depth;



        const side =
        Math.floor(
            Math.random()*4
        );



        let startX;
        let startY;



        if(side===0){

            startX =
            Math.random()*width;

            startY=-100;

        }

        else if(side===1){

            startX =
            width+100;

            startY =
            Math.random()*height;

        }

        else if(side===2){

            startX =
            Math.random()*width;

            startY =
            height+100;

        }

        else{

            startX=-100;

            startY =
            Math.random()*height;

        }



        particles.push({

            x:
            startX-width/2,


            y:
            startY-height/2,


            z:
            Math.random()*300-150,



            tx:targetX,

            ty:targetY,

            tz:targetZ,



            size:
            mobile
            ?
            Math.random()*1.5+0.5
            :
            Math.random()*2+0.8,



            speed:
            0.045+
            Math.random()*0.04,



            alpha:
            0.5+
            Math.random()*0.5

        });



    }


}
// ==========================================
// DRAW HEART ANIMATION
// ==========================================


function animate(time){


    ctx.clearRect(
        0,
        0,
        width,
        height
    );



    const elapsed =
    time - startTime;



    // ======================================
    // PARTICLE FORMATION
    // ======================================


    particles.forEach(p=>{


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



    });



    if(elapsed > 2600){

        formed = true;

    }



    // ======================================
    // HEARTBEAT EFFECT
    // ======================================


    let pulse = 1;



    if(formed){


        pulse =
        1
        +
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


        // Keep heart still
        const x =
        p.x;



        const z =
        p.z;



        // depth perspective

        const perspective =
        600 /
        (600+z);



        const screenX =
        width/2
        +
        x
        *
        perspective
        *
        pulse;



        const screenY =
        height/2
        +
        p.y
        *
        perspective
        *
        pulse;



        const size =
        Math.max(
            0.5,
            p.size *
            perspective
        );



        ctx.beginPath();



        ctx.arc(
            screenX,
            screenY,
            size,
            0,
            Math.PI*2
        );



        const glow =
        Math.random()*30;



        ctx.fillStyle =

        `rgba(
        ${255},
        ${80+glow},
        ${140+glow},
        ${p.alpha}
        )`;



        ctx.shadowBlur =
        8;



        ctx.shadowColor =
        "rgba(255,100,160,.6)";



        ctx.fill();



    });



    requestAnimationFrame(
        animate
    );


}



// ==========================================
// SHOW MESSAGE
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


},3200);



// ==========================================
// START HEART
// ==========================================


resizeCanvas();


createParticles();


requestAnimationFrame(
    animate
);
// ==========================================
// FLOATING HEARTS EFFECT
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
    Math.random()*100
    +
    "vw";



    heart.style.bottom =
    "-40px";



    heart.style.fontSize =
    (
        Math.random()*18
        +10
    )
    +
    "px";



    heart.style.animationDuration =
    (
        Math.random()*5
        +6
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
    Math.random()*100
    +
    "%";



    sparkle.style.top =
    Math.random()*100
    +
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

    450

);





// ==========================================
// REALISTIC PETAL RAIN
// ==========================================


const petalContainer =
document.getElementById(
    "petalContainer"
);



function createPetal(){


    if(!petalContainer)
        return;



    const random =
    Math.random();



    const petal =
    document.createElement(
        "div"
    );



    // 70% Cherry Blossom

    if(random < 0.70){


        petal.className =
        "petal cherry";


    }



    // 20% Rose

    else if(random < 0.90){


        petal.className =
        "petal rose";


    }



    // 10% Sparkle petals

    else{


        petal.className =
        "sparklePetal";


    }





    petal.style.left =
    Math.random()*100
    +
    "vw";



    petal.style.animationDuration =
    (
        7+
        Math.random()*6
    )
    +
    "s";



    if(
        petal.classList.contains(
            "petal"
        )
    ){


        petal.style.width =
        (
            14+
            Math.random()*12
        )
        +
        "px";



        petal.style.height =
        (
            18+
            Math.random()*12
        )
        +
        "px";


    }



    petalContainer.appendChild(
        petal
    );



    setTimeout(()=>{


        petal.remove();


    },15000);



}




// Start petals after heart forms

setTimeout(()=>{


    setInterval(

        createPetal,

        250

    );


},3500);
// ==========================================
// MUSIC CONTROL
// ==========================================


const music =
document.getElementById(
    "bgMusic"
);



const musicButton =
document.getElementById(
    "musicButton"
);



let musicPlaying = false;



if(music){


    music.volume = 0.35;


}



if(musicButton){


    musicButton.addEventListener(
        "click",
        async ()=>{


            if(!musicPlaying){


                try{


                    await music.play();


                    musicPlaying =
                    true;


                    musicButton.innerHTML =
                    "♫ Playing";



                }
                catch(error){


                    console.log(
                        "Music blocked",
                        error
                    );


                }


            }


            else{


                music.pause();


                musicPlaying =
                false;


                musicButton.innerHTML =
                "♪ Music";


            }


        }
    );


}





// ==========================================
// RESPONSIVE RESIZE
// ==========================================


let resizeTimer;



window.addEventListener(
    "resize",
    ()=>{


        clearTimeout(
            resizeTimer
        );



        resizeTimer =
        setTimeout(()=>{


            resizeCanvas();


            createParticles();


            startTime =
            performance.now();



        },300);



    }
);





// ==========================================
// TOUCH OPTIMIZATION
// ==========================================


document.addEventListener(
    "touchstart",
    ()=>{


        if(
            music &&
            !musicPlaying
        ){

            // Browser allows music
            // after user interaction

        }


    },
    {
        once:true
    }
);





// ==========================================
// FINAL START
// ==========================================


// Initial setup

resizeCanvas();


createParticles();


requestAnimationFrame(
    animate
);
