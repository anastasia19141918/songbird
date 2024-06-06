import birdsDataEn from './dataEN.js';
import birdsData from './dataRU.js';

let questionIndex = 0; //текущий вопрос
let scope = 0;//очки

showQuestion()

function showQuestion() {
  birdsDataEn.forEach(function(el){
    randomQuestion(el);
    console.log(el[questionIndex]['audio']);
    
    

  })
}

function randomQuestion(arrow) {
  for(let i = arrow.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arrow[i], arrow[j]] = [arrow[j], arrow[i]];
  }
}

function CreatQuestion(element) {
  
}
