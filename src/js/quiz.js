import birdsDataEn from './dataEN.js';
import birdsData from './dataRU.js';
console.log(birdsDataEn[0]);

const wrapper = document.getElementById('game__wrapper');
const answerChoice = document.getElementById('answer__choice');
const answerDesk =  document.getElementById('answer__desk');

let questionIndex = 0; //текущий вопрос
let scope = 0;//очки

const audio = new Audio;
let isPlay = false;

window.addEventListener('load', arrowQuestion);

function arrowQuestion() {
  let itemnsQuestion = birdsDataEn[0].map(function(el){
    return el;
  });
  const randomIndex = Math.floor(Math.random() * (itemnsQuestion.length - 1));
  const result = itemnsQuestion[randomIndex];
  сreatanswer(birdsDataEn[0]);
  console.log(result);
  return  сreatQuestion(result);
}

//Question start
function сreatQuestion(e) {
  const div = document.createElement('div');
    div.classList.add('game__question');

    const img = document.createElement('img');
    img.classList.add('game__question-img');
    img.src = './src/img/question.jpg';
    img.alt = 'img question';

    const divGuestionDesk = document.createElement('div');
    divGuestionDesk.classList.add('game__question-desk');

    const title = document.createElement('h2');
    title.classList.add('game__question-title');
    title.innerText = '********';

    const divGuestionMusik = document.createElement('div');
    divGuestionMusik.classList.add('game__question-musik');

    const divBtnPlay = document.createElement('div');
    divBtnPlay.classList.add('game__question-play');

    const divProgressBar =  document.createElement('div');
    divProgressBar.classList.add('game__question-progressBar');

    const divProgressBarBlock =  document.createElement('div');
    divProgressBarBlock.classList.add('game__question-progressBarBlock');

    const divProgressBarRanch = document.createElement('div');
    divProgressBarRanch.classList.add('game__question-range');

    const divTime = document.createElement('div');
    divTime.classList.add('game__question-time');

    const divCurrentTime = document.createElement('div');
    divCurrentTime.classList.add('game__question-current-time');
    divCurrentTime.innerText = '0:00';

    const divCurrentlength = document.createElement('div');
    divCurrentlength.classList.add('game__question-current-length');
    divCurrentlength.innerText = '0:00';

    const divSound = document.createElement('div');
    divSound.classList.add('game__question-sound');

    const divSoundBtn = document.createElement('div');
    divSoundBtn.classList.add('game__question-soundBtn');

    const divSounProgressBar = document.createElement('div');
    divSounProgressBar.classList.add('game__question-sounProgressBar');

    const input = document.createElement('input');
    input.classList.add('game__question-sounType');
    input.type = 'range';
    input.min = '0';
    input.max = '100';
    input.step = '0.1';

    wrapper.appendChild(div);
    div.appendChild(img);
    div.appendChild(divGuestionDesk);
    divGuestionDesk.appendChild(title);
    divGuestionDesk.appendChild(divGuestionMusik);
    divGuestionMusik.appendChild(divBtnPlay);
    divGuestionMusik.appendChild(divProgressBar);
    divProgressBar.appendChild(divProgressBarBlock);
    divProgressBarBlock.appendChild(divProgressBarRanch);
    divProgressBar.appendChild(divTime);
    divTime.appendChild(divCurrentTime);
    divTime.appendChild(divCurrentlength);
    divGuestionDesk.appendChild(divSound);
    divSound.appendChild(divSoundBtn);
    divSound.appendChild(divSounProgressBar);
    divSounProgressBar.appendChild(input);

    divBtnPlay.addEventListener('click', function(){
      playBtnGuestion (e, divBtnPlay);
    })

    audio.addEventListener ('timeupdate', function(el){
      updateBarQuestion(el, divProgressBarRanch);
      timeProgressBarQuestion(divCurrentTime, divCurrentlength);
    })

    divProgressBarBlock.addEventListener('click',  function(e){
      setBarQuestion (e, divProgressBarBlock);
    })

    divSoundBtn.addEventListener('click', function(){
      saundMusikQuestion(divSoundBtn);
    })

    input.addEventListener('click', function(el){
      saundRahgeQuestion(el,input,divSoundBtn);
    })

  }

function playBtnGuestion (e, divBtnPlay) {
  if(isPlay === false){
        isPlay = true;
        audio.src = e.audio;
        audio.currentTime = 0;
        audio.play();
        divBtnPlay.classList.toggle('game__question-pause');
      } else {
        isPlay = false;
        audio.pause();
        divBtnPlay.classList.toggle('game__question-pause');
    }
}

function updateBarQuestion (e, divProgressBarRanch) {
  const {duration, currentTime} = e.srcElement;
  const progressPresents = (currentTime / duration )* 100;
  divProgressBarRanch.style.width = `${progressPresents}%`;
}

function setBarQuestion (e, divProgressBarBlock) {
  const width = divProgressBarBlock.clientWidth;
  const clickBarX = e.offsetX;
  const durationbar = audio.duration;
  audio.currentTime = (clickBarX / width) * durationbar;
}

function timeProgressBarQuestion(divCurrentTime, divCurrentlength) {
  divCurrentTime.innerText = audioTime ();
  divCurrentlength.innerText = audioDuratio();
  if(divCurrentlength.innerText === 'NaN:NaN' || divCurrentTime.innerText.innerText === 'NaN:NaN') {
    divCurrentlength.innerText = '0:00';
    divCurrentTime.innerText.innerText = '0:00';
  }
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

function saundMusikQuestion(divSoundBtn) {
  audio.muted = !audio.muted;
  
  if(audio.muted) {
    divSoundBtn.classList.remove('game__question-soundBtn');
    divSoundBtn.classList.add('game__question-soundBtn_stop');
  }
  else {
    divSoundBtn.classList.add('game__question-soundBtn');
    divSoundBtn.classList.remove('game__question-soundBtn_stop');
  }
}

function saundRahgeQuestion (e,input,divSoundBtn) {
  const value = e.target.value;
  input.style.background = `linear-gradient(to right, #CEAD78 0%, #CEAD78 ${value}%, #ffffff ${value}%, #ffffff 100%)`;
  if(value === input.min) {
    audio.volume = 0;
    divSoundBtn.classList.toggle('game__question-soundBtn_stop');
  } else {
    divSoundBtn.classList.remove('game__question-soundBtn_stop');
    audio.volume = value / 100;
  }
}
//Question end


//birds start 
function  сreatanswer(element) {
  element.forEach(function(el){
    const btn = document.createElement('button');
    btn.classList.add('answer__btn');
    btn.innerText = el.name;

    answerChoice.appendChild(btn);

    btn.addEventListener('click', function(elem){
      if(el.id === el.id) {
        creatInfobirds(el);
      } 
    })
  })
}

function creatInfobirds(el) {
  answerDesk.innerHTML =  '';

  let div = document.createElement('div');
    div.classList.add('answer__deskBird');
    
    let divDesk = document.createElement('div');
    divDesk.classList.add('bird__desk');

    let img = document.createElement('img');
    img.classList.add('bird__img');
    img.alt = 'bird';
    img.src = el.image;

    let divMusik = document.createElement('div');
    divMusik.classList.add('answer__musiс');//ьузфка

    let title = document.createElement('h2');
    title.classList.add('bird__title');
    title.innerText = el.name;

    let titleSmall = document.createElement('div');
    titleSmall.classList.add('bird__title-small');
    titleSmall.innerText = el.species;

    let text = document.createElement('div');
    text.classList.add('bird__text');
    text.innerText =  el.description;

    answerDesk.appendChild(div);
    div.appendChild(divDesk);
    divDesk.appendChild(img);
    divDesk.appendChild(divMusik);
    divMusik.appendChild(title);
    divMusik.appendChild(titleSmall);
    
    div.appendChild(text);
}

///birds end







