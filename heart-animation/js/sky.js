const sky =
document.getElementById("sky");


let hour =
new Date().getHours();



function createStars(){


for(let i=0;i<100;i++){


let star =
document.createElement("div");


star.className="star";


star.style.left =
Math.random()*100+"%";


star.style.top =
Math.random()*100+"%";


sky.appendChild(star);


}

}



function createCloud(){


let cloud =
document.createElement("div");


cloud.className="cloud";


cloud.style.top =
Math.random()*40+"%";


sky.appendChild(cloud);



setTimeout(()=>{

cloud.remove();

},40000);


}



if(hour>=19 || hour<6){

createStars();

}

else{


setInterval(createCloud,5000);


}
