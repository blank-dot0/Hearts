// =================================
// MUSIC SYSTEM
// =================================


const music =
document.getElementById("bgMusic");


const button =
document.getElementById("musicButton");



let playing=false;



music.volume=0;



function fadeIn(){


let volume=0;



let fade =
setInterval(()=>{


volume+=0.02;


music.volume=volume;



if(volume>=0.4){

clearInterval(fade);

}



},100);



}




button.onclick=()=>{


if(!playing){



music.play();



fadeIn();



button.innerHTML="🔊";



playing=true;



}

else{


music.pause();



button.innerHTML="🔇";


playing=false;


}


};
