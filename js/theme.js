// =====================================
// AUTOMATIC DAY / NIGHT THEME
// =====================================


function updateTheme(){


    let hour = new Date().getHours();


    const body = document.body;


    if(hour >= 19 || hour < 6){

        body.classList.add("night");


    }

    else{


        body.classList.remove("night");


    }



}



updateTheme();


// Update every minute

setInterval(updateTheme,60000);




// =====================================
// FLOATING PINK PARTICLES
// =====================================


const particleContainer =
document.getElementById("particles");



function createParticle(){


    const particle =
    document.createElement("div");


    particle.className =
    "floating-particle";



    let size =
    Math.random()*10+3;



    particle.style.width =
    size+"px";


    particle.style.height =
    size+"px";



    particle.style.left =
    Math.random()*100+"%";



    particle.style.animationDuration =
    (Math.random()*5+5)+"s";



    particle.style.opacity =
    Math.random();



    particleContainer.appendChild(particle);



    setTimeout(()=>{


        particle.remove();


    },10000);



}



// Create particles continuously

setInterval(createParticle,250);
