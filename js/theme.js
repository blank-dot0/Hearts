// ==========================================
// AUTOMATIC DAY / NIGHT THEME
// ==========================================


function updateTheme(){


    const hour =
        new Date().getHours();



    const body =
        document.body;



    /*
        Day:
        6 AM - 6 PM

        Night:
        6 PM - 6 AM
    */


    if(
        hour >= 6 &&
        hour < 18
    ){

        body.classList.remove(
            "night"
        );


    }
    else{


        body.classList.add(
            "night"
        );


    }

}



// Run immediately

updateTheme();


// Check every minute

setInterval(

    updateTheme,

    60000

);




// ==========================================
// FLOATING HEART GENERATOR
// ==========================================


const heartContainer =
document.querySelector(
    ".floating-hearts"
);



function createHeart(){


    if(!heartContainer)
        return;



    const heart =
    document.createElement(
        "span"
    );


    heart.className =
    "floating-heart";


    heart.innerHTML =
    Math.random() > 0.5
    ? "♥"
    : "♡";



    heart.style.left =
    Math.random()*100
    + "vw";



    heart.style.fontSize =

    (
        Math.random()*20
        + 12

    )
    + "px";



    heart.style.animationDuration =

    (
        Math.random()*5
        + 6

    )
    + "s";



    heartContainer.appendChild(
        heart
    );



    setTimeout(()=>{


        heart.remove();


    },

    12000);


}




// Create hearts continuously

setInterval(

    createHeart,

    700

);
