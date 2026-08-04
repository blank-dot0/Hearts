let sound =
false;


const button =
document.getElementById("soundToggle");



button.onclick=()=>{


sound=!sound;


button.innerHTML =
sound ? "🔊" : "🔇";



};
