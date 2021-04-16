import transactionHistory from './gallery-items.js';

const galery = document.querySelector('.js-gallery');

const imagesList = transactionHistory.map(({ preview, original,  description}) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
        alt="${description}"
        />
      </a>
    </li>`
    ;
}).join(' ');

galery.insertAdjacentHTML('beforeend', imagesList);

const modalWindow = document.querySelector('.js-lightbox');
const modalBigImg = document.querySelector('.lightbox__image');
const overlay = modalWindow.querySelector('.lightbox__overlay');
const buttonClose = document.querySelector('button[data-action="close-lightbox"]');


galery.addEventListener('click', openModalWindow);

function openModalWindow(event) {
  event.preventDefault();
  const target = event.target;
  
  if (target.nodeName === 'IMG') {
    modalWindow.classList.add('is-open');
  } else {
    return;
  }
  
  modalBigImg.src = target.dataset.source;
};

buttonClose.addEventListener('click', closeModalWindow);
modalWindow.addEventListener('click', e => {
  if (e.target === overlay) {
    closeModalWindow();
  }
});
window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeModalWindow();
  }
});

function closeModalWindow() {
  modalWindow.classList.remove('is-open');
  modalBigImg.src = '';
};

const arrayWithImages = document.querySelectorAll('.gallery__image');
const imagesSrc = [];

arrayWithImages.forEach(e => {
  imagesSrc.push(e.getAttribute('data-source'));
});

document.addEventListener('keydown', (e => {
  let newIndex = imagesSrc.indexOf(modalBigImg.src);
  
  if (newIndex < 0) {
    return;
  };
  if (e.code === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = imagesSrc.length - 1;
    }
  } else if (e.code === 'ArrowRight') {
    newIndex += 1;
    if (newIndex === imagesSrc.length) {
      newIndex = 0;
    }
  }
  modalBigImg.src = imagesSrc[newIndex];
}));