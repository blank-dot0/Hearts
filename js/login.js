// ==========================================
// LOGIN PAGE CONTROL
// ==========================================


const enterButton =
document.getElementById(
    "enterBtn"
);



if(enterButton){


    enterButton.addEventListener(
        "click",
        () => {


            // No username/password checking
            // Anyone can enter


            enterButton.innerHTML =
            "Loading ❤️";


            enterButton.style.opacity =
            "0.7";



            setTimeout(()=>{


                window.location.href =
                "heart.html";


            },800);



        }
    );

}




// Allow Enter key press

document.addEventListener(
    "keydown",

    (event)=>{


        if(
            event.key === "Enter"
        ){


            if(enterButton){

                enterButton.click();

            }

        }


    }
);
