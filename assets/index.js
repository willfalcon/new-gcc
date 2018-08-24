const bgVideo = require('./js/bgVideo');
bgVideo();

const toggler = document.querySelector('.navbar-toggler');
const header = document.querySelector('header');
const nav = document.querySelector('nav');

function overflowHidden() {
  header.style.overflow = 'hidden';
  nav.removeEventListener('transitionend', overflowHidden);
}

function toggleMenu(e) {
  if (header.classList.contains('open')) {
    header.classList.remove('open');
    nav.addEventListener('transitionend', overflowHidden);
  } else {
    header.style.overflow = 'visible';
    header.classList.add('open');
  }
}

toggler.addEventListener('click', toggleMenu);
