console.log("welcome to spotify")

let songs = [{name:"Beliver",     path:"songs/1.mp3",  cover:"covers/1.jpg"},
             {name:"Faded",       path:"songs/2.mp3",  cover:"covers/2.jpg"},
             {name:"Happier",     path:"songs/3.mp3",  cover:"covers/3.jpg"},
             {name:"Lily",        path:"songs/4.mp3",  cover:"covers/4.jpg"},
             {name:"On My Way",   path:"songs/5.mp3",  cover:"covers/5.jpg"},
             {name:"Play Date",   path:"songs/6.mp3",  cover:"covers/6.jpg"},
             {name:"Shape Of You",path:"songs/7.mp3",  cover:"covers/7.jpg"},
             {name:"Solo",        path:"songs/8.mp3",  cover:"covers/8.jpg"},
             {name:"Taki Taki",   path:"songs/9.mp3",  cover:"covers/9.jpg"},
             {name:"The Spectre", path:"songs/10.mp3", cover:"covers/10.jpg"}];

let songList = Array.from(document.getElementsByClassName("songItem"));

songList.forEach((element,i) =>{
 element.getElementsByTagName("img")[0].src = songs[i].cover;
 element.getElementsByClassName("songname")[0].innerHTML = songs[i].name;
});

let audioElement = new Audio('songs/1.mp3');
let playPause = document.getElementById("play");
let progreeBar = document.getElementById("progressBar");
let danicngImage = document.getElementById("dance");
let songItemPlay = Array.from(document.getElementsByClassName("songPlayItem"));
let PlayingSongName = document.getElementsByClassName("songnamebottom");

playPause.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        playPause.classList.remove("fa-play-circle");
        playPause.classList.add("fa-pause-circle");
        danicngImage.style.opacity = 1;
    }else{
        audioElement.pause();
        makeAllPause();
        playPause.classList.remove("fa-pause-circle");
        playPause.classList.add("fa-play-circle");
        danicngImage.style.opacity = 0;
    }
});

audioElement.addEventListener("timeupdate",(e)=>{
    //updating progress bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progreeBar.value = progress;
});

progreeBar.addEventListener("change",(e)=>{
    audioElement.currentTime = (progreeBar.value*audioElement.duration)/100;
});

const makeAllPause = ()=>{ 
     songItemPlay.forEach((e)=>{
        e.classList.remove("fa-pause-circle");
        e.classList.add("fa-play-circle");  
     });    
};

songItemPlay.forEach((e)=>{
   e.addEventListener("click",(e)=>{
    if(!audioElement.paused && audioElement.src.substring(audioElement.src.length-12)==`/songs/${e.target.id}.mp3` || audioElement.src.substring(audioElement.src.length-12)==`songs/${e.target.id}.mp3` ){
        makeAllPause();
        playPause.click();
    }
    else{
        makeAllPause();
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${e.target.id}.mp3`;
        playPause.click();
        PlayingSongName[0].innerHTML = '  '+songs[e.target.id-1].name+' - Unknown Artist';
    }
   });
});

