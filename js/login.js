// =====================================
// LOGIN SYSTEM
// Any username/password accepted
// =====================================


const loginForm = document.getElementById("loginForm");
const button = document.getElementById("loginButton");


loginForm.addEventListener("submit", function(e){

    e.preventDefault();


    // Button animation

    button.innerHTML = "Opening ❤️";

    button.style.transform = "scale(0.95)";


    setTimeout(()=>{


        button.style.transform = "scale(1)";


        // Smooth transition

        document.body.style.opacity = "0";


        setTimeout(()=>{


            window.location.href = "heart.html";


        },1000);



    },800);



});
