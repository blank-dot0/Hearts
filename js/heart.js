// =============================================
// ROMANTIC 3D PARTICLE HEART
// =============================================

const canvas =
    document.getElementById("heartCanvas");

const ctx =
    canvas.getContext("2d");


let width;
let height;

let dpr = 1;

let particles = [];

let animationStart =
    performance.now();


// Animation timings

const FORM_DURATION = 2400;

const ROTATION_DURATION = 2200;

const MESSAGE_DELAY = 300;


// Rotation state

let rotationCompleted = false;

let messageShown = false;


// =============================================
// CANVAS SIZE
// =============================================

function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;


    // Prevent huge high-DPI canvases

    dpr =
        Math.min(
            window.devicePixelRatio || 1,
            1.5
        );


    canvas.width =
        Math.floor(width * dpr);

    canvas.height =
        Math.floor(height * dpr);


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeCanvas();


// =============================================
// PARTICLE COUNT
// =============================================

function getParticleCount() {

    if (width < 480) {

        return 1100;

    }


    if (width < 800) {

        return 1600;

    }


    return 2400;

}


// =============================================
// HEART EQUATION
// =============================================

function heartPoint(t) {

    const x =
        16 *
        Math.pow(
            Math.sin(t),
            3
        );


    const y =

        13 * Math.cos(t)

        - 5 * Math.cos(2 * t)

        - 2 * Math.cos(3 * t)

        - Math.cos(4 * t);


    return {

        x,

        y

    };

}


// =============================================
// CREATE PARTICLES
// =============================================

function createParticles() {

    particles = [];


    const count =
        getParticleCount();


    const heartScale =

        Math.min(
            width / 38,
            height / 38
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const t =
            Math.random() *
            Math.PI *
            2;


        const point =
            heartPoint(t);


        // Thickness/depth

        const depth =

            (
                Math.random() -
                0.5
            ) *
            heartScale *
            5;


        // Slight variation makes it organic

        const jitter =

            0.90 +
            Math.random() *
            0.10;


        const targetX =

            point.x *
            heartScale *
            jitter;


        const targetY =

            -point.y *
            heartScale *
            jitter;


        // Start from outside/edges

        const side =
            Math.floor(
                Math.random() * 4
            );


        let startX;
        let startY;


        if (side === 0) {

            startX =
                -Math.random() *
                width *
                0.25;

            startY =
                Math.random() *
                height;

        }

        else if (side === 1) {

            startX =
                width +
                Math.random() *
                width *
                0.25;

            startY =
                Math.random() *
                height;

        }

        else if (side === 2) {

            startX =
                Math.random() *
                width;

            startY =
                -Math.random() *
                height *
                0.2;

        }

        else {

            startX =
                Math.random() *
                width;

            startY =
                height +
                Math.random() *
                height *
                0.2;

        }


        particles.push({

            startX,
            startY,

            x:
                startX,

            y:
                startY,

            hx:
                targetX,

            hy:
                targetY,

            z:
                depth,

            size:

                0.7 +
                Math.random() *
                1.7,

            alpha:

                0.55 +
                Math.random() *
                0.45

        });

    }

}


createParticles();


// =============================================
// EASING
// =============================================

function easeOutCubic(x) {

    return (
        1 -
        Math.pow(
            1 - x,
            3
        )
    );

}


function easeInOutCubic(x) {

    return (

        x < 0.5

        ?

        4 * x * x * x

        :

        1 -

        Math.pow(
            -2 * x + 2,
            3
        ) / 2

    );

}


// =============================================
// DRAW
// =============================================

function animate(now) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const elapsed =
        now -
        animationStart;


    // Heart formation progress

    const formationProgress =

        Math.min(
            elapsed /
            FORM_DURATION,
            1
        );


    const formationEase =
        easeOutCubic(
            formationProgress
        );


    // Rotation begins only after formation

    let rotation = 0;


    if (
        elapsed >
        FORM_DURATION
    ) {

        const rotationProgress =

            Math.min(

                (
                    elapsed -
                    FORM_DURATION
                )
                /
                ROTATION_DURATION,

                1

            );


        rotation =

            Math.PI *
            2 *
            easeInOutCubic(
                rotationProgress
            );


        if (
            rotationProgress >= 1
        ) {

            rotationCompleted =
                true;

            rotation = 0;

        }

    }


    // Heartbeat only after rotation

    let pulse = 1;


    if (rotationCompleted) {

        const pulseTime =

            (
                elapsed -
                FORM_DURATION -
                ROTATION_DURATION
            ) / 1000;


        pulse =

            1 +

            Math.pow(
                Math.max(
                    0,
                    Math.sin(
                        pulseTime *
                        Math.PI *
                        1.4
                    )
                ),
                7
            ) * 0.035;

    }


    const cos =
        Math.cos(rotation);

    const sin =
        Math.sin(rotation);


    const centerX =
        width / 2;

    const centerY =
        height * 0.46;


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        const p =
            particles[i];


        // Formation

        const formedX =

            p.startX +

            (
                centerX +
                p.hx -
                p.startX
            )
            *
            formationEase;


        const formedY =

            p.startY +

            (
                centerY +
                p.hy -
                p.startY
            )
            *
            formationEase;


        // Local coordinates

        const localX =

            formedX -
            centerX;


        const localY =

            formedY -
            centerY;


        // Y-axis 3D rotation

        const rotatedX =

            localX *
            cos

            -

            p.z *
            sin;


        const rotatedZ =

            localX *
            sin

            +

            p.z *
            cos;


        // Perspective

        const perspective =

            650 /
            (
                650 +
                rotatedZ
            );


        const drawX =

            centerX +

            rotatedX *
            perspective *
            pulse;


        const drawY =

            centerY +

            localY *
            perspective *
            pulse;


        const particleSize =

            Math.max(
                0.55,

                p.size *
                perspective
            );


        ctx.beginPath();


        ctx.arc(

            drawX,

            drawY,

            particleSize,

            0,

            Math.PI * 2

        );


        // Depth changes brightness

        const lightness =

            Math.max(
                38,

                Math.min(
                    63,

                    52 -
                    rotatedZ *
                    0.05
                )
            );


        ctx.fillStyle =

            `hsla(
                343,
                78%,
                ${lightness}%,
                ${p.alpha}
            )`;


        ctx.fill();

    }


    // Message

    if (
        !messageShown &&

        elapsed >

        FORM_DURATION +
        ROTATION_DURATION +
        MESSAGE_DELAY
    ) {

        messageShown =
            true;


        const message =

            document.getElementById(
                "message"
            );


        message.classList.add(
            "show"
        );

    }


    requestAnimationFrame(
        animate
    );

}


requestAnimationFrame(
    animate
);


// =============================================
// SPARKLES
// =============================================

const sparkleContainer =
    document.getElementById(
        "sparkles"
    );


function createSparkle() {

    const sparkle =
        document.createElement(
            "div"
        );


    sparkle.className =
        "sparkle";


    sparkle.style.left =

        (
            8 +
            Math.random() *
            84
        ) + "%";


    sparkle.style.top =

        (
            8 +
            Math.random() *
            76
        ) + "%";


    const size =

        2 +
        Math.random() *
        4;


    sparkle.style.width =
        size + "px";

    sparkle.style.height =
        size + "px";


    sparkleContainer.appendChild(
        sparkle
    );


    setTimeout(
        () => sparkle.remove(),
        2000
    );

}


setInterval(
    createSparkle,
    450
);


// =============================================
// MUSIC
// =============================================

const music =
    document.getElementById(
        "bgMusic"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


let musicPlaying =
    false;


music.volume =
    0.32;


musicButton.addEventListener(
    "click",

    async () => {

        try {

            if (
                musicPlaying
            ) {

                music.pause();

                musicPlaying =
                    false;

                musicButton.textContent =
                    "♫";

            }

            else {

                await music.play();

                musicPlaying =
                    true;

                musicButton.textContent =
                    "❚❚";

            }

        }

        catch (error) {

            console.log(
                "Music playback requires user interaction."
            );

        }

    }
);


// =============================================
// RESIZE
// =============================================

let resizeTimer;


window.addEventListener(
    "resize",

    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    resizeCanvas();

                    createParticles();

                    animationStart =
                        performance.now();

                    rotationCompleted =
                        false;

                    messageShown =
                        false;


                    document
                        .getElementById(
                            "message"
                        )
                        .classList
                        .remove(
                            "show"
                        );

                },

                200
            );

    }
);
