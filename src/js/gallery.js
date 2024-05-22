import birdsDataEn from './dataEN.js';
import birdsData from './dataRU.js';

const galleryBtns = document.getElementById('gallery__btns');
const galleryBtn = document.querySelectorAll('.gallery__btn');


galleryBtns.addEventListener('click', function(el){
  galleryBtn.forEach(function(e){
    e.classList.remove('gallery__btn__active');
  })

  if(el.target.classList.contains('gallery__btn')) {
    el.target.classList.add('gallery__btn__active');
  }
})

