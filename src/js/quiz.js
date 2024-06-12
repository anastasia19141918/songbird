import birdsDataEn from './dataEN.js';

const wrapper = document.getElementById('game__wrapper');
const answerChoice = document.getElementById('answer__choice');
const answerDesk = document.getElementById('answer__desk');
const gameTitle = document.getElementById('game__score');
const answerNext = document.getElementById('answer__next');
const gameBtn = document.querySelectorAll('.game__btn');
const resultScoreCount = document.getElementById('result__score_count');
const result = document.getElementById('result');
const resultBody = document.getElementById('result__body');
const resulBtn =  document.getElementById('result__btn');


let questionIndex = 0; //текущий вопрос
let score = 5;//очки

const audio = new Audio;
let isPlay = false;

window.addEventListener('load', arrowQuestion);

function arrowQuestion() {
  let itemnsQuestion = birdsDataEn[questionIndex].map(function(el){
    return el;
  });
  const randomIndex = Math.floor(Math.random() * (itemnsQuestion.length - 1));
  const result = itemnsQuestion[randomIndex];
  сreatanswer(birdsDataEn[questionIndex], result);
  return  сreatQuestion(result);
  
}

//Question start
function сreatQuestion(e) {
  const div = document.getElementById('game__question');
  div.innerText = '';
    
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
    });

    audio.addEventListener ('timeupdate', function(el){
      updateBarQuestion(el, divProgressBarRanch);
      timeProgressBarQuestion(divCurrentTime, divCurrentlength);
    });

    divProgressBarBlock.addEventListener('click',  function(e){
      setBarQuestion (e, divProgressBarBlock);
    });

    divSoundBtn.addEventListener('click', function(){
      saundMusikQuestion(divSoundBtn);
    });

    input.addEventListener('click', function(el){
      saundRahgeQuestion(el,input,divSoundBtn);
    });

    return title;
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
function  сreatanswer(element, result) {
  
  answerNext.disabled = true;
  answerChoice.innerText = '';
  element.forEach(function(el){
    const btn = document.createElement('button');
    btn.classList.add('answer__btn');
    btn.innerText = el.name;
    
    answerChoice.appendChild(btn);

    btn.addEventListener('click', function(){
      if(el.id === el.id) {
        creatInfoBirds(el);
      } 

      if (el.id === result.id) {
        let showBird = сreatQuestion();
        btn.classList.add('answer__btn__answer');
        gameTitle.innerText =  score +=5;
        answerNext.classList.add('answer__next__active');

        answerNext.disabled = false;
        showBird.innerHTML = result.name;
      }

      if (el.id !== result.id) {
        btn.classList.add('answer__btn__noAnswer');
        gameTitle.innerText = score -=1;
      }
      if(answerNext.classList.contains('answer__next__active')) {
        btn.classList.remove('answer__btn__noAnswer');
      }
     
    })
  })
}

function creatInfoBirds(el) {
  answerDesk.innerHTML =  '';

  let div = document.createElement('div');
    div.classList.add('answer__deskBird');
    
    let divDesk = document.createElement('div');
    divDesk.classList.add('bird__desk');

    let img = document.createElement('img');
    img.classList.add('bird__img');
    img.classList.add('bird__img-answer');
    img.alt = 'bird';
    img.src = el.image;

    let divMusik = document.createElement('div');
    divMusik.classList.add('answer__musiс');

    let title = document.createElement('h2');
    title.classList.add('bird__title');
    title.innerText = el.name;

    let titleSmall = document.createElement('div');
    titleSmall.classList.add('bird__title-small');
    titleSmall.innerText = el.species;

    let text = document.createElement('div');
    text.classList.add('bird__text');
    text.innerText = el.description;

    answerDesk.appendChild(div);
    div.appendChild(divDesk);
    divDesk.appendChild(img);
    divDesk.appendChild(divMusik);
    divMusik.appendChild(title);
    divMusik.appendChild(titleSmall);
    
    div.appendChild(text);
}

///birds end

answerNext.addEventListener('click', nextAnswe);

function nextAnswe() {
  answerNext.classList.remove('answer__next__active');
  
  
  if(questionIndex !== birdsDataEn.length - 1) {
    questionIndex++;
    arrowQuestion();
    nexBtnQuestion()
  } else {
    showResult();
  }
  
};

function nexBtnQuestion() {
  let newArrowBtn = Array.from(gameBtn);
  newArrowBtn[questionIndex];
  newArrowBtn[questionIndex].classList.add('game__btn__active');
}

function showResult() {
  resultScoreCount.innerHTML = score;
  result.classList.add('result__active');
}

document.addEventListener('mouseup', function(e){
  if(!resultBody.contains(e.target)) {
   
    result.classList.remove('result__active');
  }
});

resulBtn.addEventListener('click', function(){
  history.go();
});












