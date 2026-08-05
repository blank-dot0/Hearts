// ==========================================
// ROMANTIC PARTICLE HEART
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

// No heart rotation
const rotation = 0;

let formationComplete = false;


// ==========================================
// CANVAS SIZE
// ==========================================

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            1.5
        );

    width = rect.width;
    height = rect.height;

    canvas.width =
        Math.floor(width * dpr);

    canvas.height =
        Math.floor(height * dpr);

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

    return { x, y };
}


// ==========================================
// PARTICLES
// ==========================================

function createParticles() {

    particles = [];

    const mobile =
        window.innerWidth < 600;

    const count =
        mobile ? 1500 : 2600;

    const scale =
        Math.min(
            width,
            height
        ) / 40;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const t =
            Math.random()
            * Math.PI
            * 2;

        const heart =
            heartPoint(t);


        // Makes the heart thicker
        const thickness =
            (Math.random() - 0.5)
            * scale
            * 2.2;


        const targetX =
            heart.x * scale
            + thickness;


        const targetY =
            -heart.y * scale
            + thickness;


        const targetZ =
            (Math.random() - 0.5)
            * scale
            * 5;


        // Start particles around/outside canvas
        const side =
            Math.floor(
                Math.random() * 4
            );

        let startX;
        let startY;


        if (side === 0) {

            startX =
                Math.random() * width;

            startY = -50;

        } else if (side === 1) {

            startX =
                width + 50;

            startY =
                Math.random() * height;

        } else if (side === 2) {

            startX =
                Math.random() * width;

            startY =
                height + 50;

        } else {

            startX = -50;

            startY =
                Math.random() * height;
        }


        particles.push({

            x:
                startX
                - width / 2,

            y:
                startY
                - height / 2,

            z:
                (
                    Math.random()
                    - 0.5
                ) * 200,

            tx: targetX,

            ty: targetY,

            tz: targetZ,

            size:
                mobile
                    ? Math.random() * 1.5 + 0.7
                    : Math.random() * 1.8 + 0.8,

            speed:
                0.055
                + Math.random() * 0.045,

            alpha:
                0.55
                + Math.random() * 0.45

        });
    }
}


// ==========================================
// DRAW
// ==========================================

function animate(time) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const elapsed =
        time - startTime;


    // Formation
    particles.forEach(p => {

        p.x +=
            (p.tx - p.x)
            * p.speed;

        p.y +=
            (p.ty - p.y)
            * p.speed;

        p.z +=
            (p.tz - p.z)
            * p.speed;

    });
    
// Heart stays still after forming
formationComplete = elapsed > 2400;

// Gentle heartbeat after heart forms
let pulse = 1;

if (formationComplete) {

    pulse =
        1
        + Math.sin(
            elapsed * 0.005
        ) * 0.025;
}


    particles.forEach(p => {

// No rotation - keep original depth
const rotatedX = p.x;
const rotatedZ = p.z;


        const perspective =
            650 /
            (650 + rotatedZ);


        const screenX =
            width / 2
            + rotatedX
            * perspective
            * pulse;


        const screenY =
            height / 2
            + p.y
            * perspective
            * pulse;


        const size =
            Math.max(
                0.5,
                p.size * perspective
            );


        ctx.beginPath();

        ctx.arc(
            screenX,
            screenY,
            size,
            0,
            Math.PI * 2
        );


        const depthLight =
            Math.max(
                0,
                Math.min(
                    1,
                    (perspective - 0.75)
                    * 2
                )
            );


        ctx.fillStyle =
            `rgba(
                ${190 + depthLight * 45},
                ${20 + depthLight * 35},
                ${60 + depthLight * 45},
                ${p.alpha}
            )`;


        ctx.fill();
    });


    requestAnimationFrame(
        animate
    );
}


// ==========================================
// MESSAGE
// ==========================================

setTimeout(() => {

    const message =
        document.getElementById(
            "heartMessage"
        );

    if (message) {

        message.classList.add(
            "show"
        );
    }

}, 2800);


// ==========================================
// FLOATING HEARTS
// ==========================================

const floatingBox =
    document.getElementById(
        "floatingHearts"
    );


function createFloatingHeart() {

    const heart =
        document.createElement(
            "span"
        );

    heart.className =
        "floating-heart";

    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    heart.style.left =
        Math.random() * 90
        + "%";


    heart.style.bottom =
        "-30px";


    heart.style.fontSize =
        (
            Math.random() * 13
            + 9
        ) + "px";


    const duration =
        Math.random() * 4
        + 7;


    heart.style.animationDuration =
        duration + "s";


    floatingBox.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);
}


setInterval(
    createFloatingHeart,
    850
);


// ==========================================
// SPARKLES
// ==========================================

const sparkleBox =
    document.getElementById(
        "sparkles"
    );


function createSparkle() {

    const sparkle =
        document.createElement(
            "span"
        );

    sparkle.className =
        "sparkle";


    sparkle.style.left =
        Math.random() * 100
        + "%";


    sparkle.style.top =
        Math.random() * 100
        + "%";


    sparkleBox.appendChild(
        sparkle
    );


    setTimeout(() => {

        sparkle.remove();

    }, 3000);
}


setInterval(
    createSparkle,
    500
);


// ==========================================
// MUSIC
// ==========================================

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
    0.35;


musicButton.addEventListener(
    "click",
    async () => {

        if (!musicPlaying) {

            try {

                await music.play();

                musicPlaying =
                    true;

                musicButton.innerHTML =
                    '♫ <span>Playing</span>';

            } catch (error) {

                console.log(
                    "Music could not play:",
                    error
                );
            }

        } else {

            music.pause();

            musicPlaying =
                false;

            musicButton.innerHTML =
                '♪ <span>Music</span>';
        }
    }
);


// ==========================================
// START
// ==========================================

resizeCanvas();

createParticles();

requestAnimationFrame(
    animate
);


// ==========================================
// RESPONSIVE RESIZE
// ==========================================

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );

        resizeTimer =
            setTimeout(() => {

                resizeCanvas();

                createParticles();

                startTime =
                    performance.now();

                rotation = 0;

            }, 200);
    }
);
