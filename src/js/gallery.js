import birdsDataEn from './dataEN.js';
import birdsData from './dataRU.js';



const galleryBtns = document.getElementById('gallery__btns');
const galleryBtn = document.querySelectorAll('.gallery__btn');

const galleryBlock = document.getElementById('gallery__itemns');

const audio = new Audio;
let isPlay = false;

galleryBtns.addEventListener('click', function(el){ 
  galleryBtn.forEach(function(e){
    e.classList.remove('gallery__btn__active');
  })

  if(el.target.classList.contains('gallery__btn')) {
    el.target.classList.add('gallery__btn__active');
    
    itemForest(el);
    itemPasserine(el);
    itemSong(el);
    itemPredator(el);
    itemSea(el);
    itemrandom(el);
  }
})
//birds

function creatRandom() {
  itemCreat(birdsDataEn[2]);
};

function itemForest(el) {
  if(el.target.innerText === 'FOREST BIRDS') {
    galleryBlock.innerHTML = '';
    itemCreat(birdsDataEn[0]);
  }
}

function itemPasserine(el) {
  if(el.target.innerText === 'PASSERINE BIRDS') {
    galleryBlock.innerHTML = '';
    itemCreat(birdsDataEn[1]);
  }
}

function itemSong(el) {
  if(el.target.innerText === 'SONGBIRDS') {
    galleryBlock.innerHTML = '';
    itemCreat(birdsDataEn[3]);
  }
}

function itemPredator(el) {
  if(el.target.innerText === 'PREDATOR BIRDS') {
    galleryBlock.innerHTML = '';
    itemCreat(birdsDataEn[4]);
  }
}

function itemSea(el) {
  if(el.target.innerText === 'SEABIRDS') {
    galleryBlock.innerHTML = '';
    itemCreat(birdsDataEn[5]);
  }
}

function itemrandom(el) {
  if(el.target.innerText === 'RANDOM BIRDS') {
    galleryBlock.innerHTML = '';
    itemCreat(birdsDataEn[2]);
  }
}

//creat gallery start
creatRandom();

function itemCreat(element) {
  element.forEach(function(el){

    let div = document.createElement('div');
    div.classList.add('bird');
    
    let divDesk = document.createElement('div');
    divDesk.classList.add('bird__desk');

    let img = document.createElement('img');
    img.classList.add('bird__img');
    img.alt = 'bird';
    img.src = el.image;

    let divMusik = document.createElement('div');
    divMusik.classList.add('bird__musik');

    let title = document.createElement('h2');
    title.classList.add('bird__title');
    title.innerText = el.name;

    let titleSmall = document.createElement('div');
    titleSmall.classList.add('bird__title-small');
    titleSmall.innerText = el.species;

    let divProgressBar = document.createElement('div');
    divProgressBar.classList.add('bird__progressBar');

    let divPlay = document.createElement('div');//музыка
    divPlay.classList.add('bird__play');
    divPlay.id = "bird__play";

    let divBar = document.createElement('div');
    divBar.classList.add('progressBar');
    
    let divProgressBarBlock = document.createElement('div');
    divProgressBarBlock.classList.add('progressBar__block');
    divProgressBarBlock.id = "progressBar__block";

    let divRanch = document.createElement('div');
    divRanch.classList.add('range');
    
    let progressBarTime = document.createElement('div');
    progressBarTime.classList.add('progressBar__time');

    let progressBarCurrentTime = document.createElement('div');
    progressBarCurrentTime.classList.add('progressBar__current-time');
    progressBarCurrentTime.innerText = '0:00';
    progressBarCurrentTime.id = "progressBar__current-time";

    let progressBarCurrentLength = document.createElement('div');
    progressBarCurrentLength.classList.add('progressBar__current-time');
    progressBarCurrentLength.innerText = '0:00';
    progressBarCurrentLength.id = "progressBar__current-length";

    let sound =  document.createElement('div');
    sound.classList.add('sound');

    let soundBtn = document.createElement('div');
    soundBtn.classList.add('sound__btn');
    soundBtn.id = "sound__btn";

    let soundProgressbar = document.createElement('div');
    soundProgressbar.classList.add('sound__progressbar');
    soundProgressbar.id = "sound__progressbar";

    let input = document.createElement('input');
    input.classList.add('sound__range');
    input.type = 'range';
    input.id = "sound__range";
    input.min = '0';
    input.max = '100';
    input.value = '25';
    input.step = '0.1';

    let text = document.createElement('div');
    text.classList.add('bird__text');
    text.innerText =  el.description;

    galleryBlock.appendChild(div);
    div.appendChild(divDesk);
    divDesk.appendChild(img);
    divDesk.appendChild(divMusik);
    divMusik.appendChild(title);
    divMusik.appendChild(titleSmall);
    divMusik.appendChild(divProgressBar);
    divProgressBar.appendChild(divPlay);//музыка
    divProgressBar.appendChild(divBar);
    divBar.appendChild(divProgressBarBlock);
    divProgressBarBlock.appendChild(divRanch);
    divBar.appendChild(progressBarTime);
    progressBarTime.appendChild(progressBarCurrentTime);
    progressBarTime.appendChild(progressBarCurrentLength);

    divMusik.appendChild(sound);
    sound.appendChild(soundBtn);
    sound.appendChild(soundProgressbar);
    soundProgressbar.appendChild(input);

    div.appendChild(text);

    divProgressBarBlock.addEventListener('click', function(e){
      setBar(e, divProgressBarBlock);
    })
    
    divPlay.addEventListener('click', function(){
      playAudio(el, divPlay);

      audio.addEventListener('timeupdate', function(e){
        updateBar(e, divRanch);
        timeProgressBar(progressBarCurrentTime, progressBarCurrentLength);
      });

     
    });

    soundBtn.addEventListener('click', function(){
      saundMusik(soundBtn)
    })

    input.addEventListener('click', function(el){
      saundRahge(el, input, soundBtn);
    })
  })
};

function playAudio(el, divPlay) {
  
  if(isPlay === false){
    isPlay = true;
    audio.src = el.audio;
    audio.currentTime = 0;
    audio.play();
    divPlay.classList.toggle('bird__pause');
  }

  else {
    isPlay = false;
    audio.pause();
    divPlay.classList.toggle('bird__pause');
  }
}

function saundMusik(soundBtn) {
  audio.muted = !audio.muted;
  
  if(audio.muted) {
    soundBtn.classList.remove('sound__btn');
    soundBtn.classList.add('sound__btn_stop');
  }
  else {
    soundBtn.classList.add('sound__btn');
    soundBtn.classList.remove('sound__btn_stop');
  }
}

function saundRahge(el, input, soundBtn) {
  const value = el.target.value;
  input.style.background = `linear-gradient(to right, #CEAD78 0%, #CEAD78 ${value}%, #ffffff ${value}%, #ffffff 100%)`;
  if(value === input.min) {
    audio.volume = 0;
    soundBtn.classList.toggle('sound__btn_stop');
  } else {
    soundBtn.classList.remove('sound__btn_stop');
    audio.volume = value / 100;
  }
}

function updateBar(e, divRanch) {
  const {duration, currentTime} = e.srcElement;
  const progressPresents = (currentTime / duration )* 100;
  divRanch.style.width = `${progressPresents}%`;
}

function setBar(e, divProgressBarBlock) {
  const width = divProgressBarBlock.clientWidth;
  const clickBarX = e.offsetX;
  const durationbar = audio.duration;
  audio.currentTime = (clickBarX / width) * durationbar;
}



function timeProgressBar(progressBarCurrentTime, progressBarCurrentLength) {
  progressBarCurrentTime.innerText = audioTime ();
  progressBarCurrentLength.innerText = audioDuratio();
}

function audioDuratio () {
  let minutes = Math.floor(audio.duration / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }

  let seconds = Math.floor(audio.duration % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  return `${minutes}:${seconds}`
}

function audioTime () {
  let minutes = Math.floor(audio.currentTime / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }

  let seconds = Math.floor(audio.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  return `${minutes}:${seconds}`
}

//creat gallery end




