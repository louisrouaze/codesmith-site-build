import css from './app.scss';

if (process.env.NODE_ENV !== 'production') {
  require('file-loader!./index.html');
  require('file-loader!./program.html');
  require('file-loader!./faq.html');
}

function rotateImages(containerElement) {
  setInterval(() => {
    // get current active img element
    const currentImg = containerElement.getElementsByClassName('active')[0];
    currentImg.classList.remove('active');

    // get next img element
    const nextImg = currentImg.nextElementSibling || containerElement.getElementsByClassName('first')[0];
    nextImg.classList.add('active');
  }, 8000);
}

// when the window scrolls past 30pixels, the main nav becomes fixed
function respondToScroll(el) {
  if (el) {
    if (window.scrollY > 30) {
      el.classList.add('on-scroll', 'navbar-fixed-top');
      document.body.classList.add('nav-pad');
    } else {
      el.classList.remove('on-scroll', 'navbar-fixed-top');
      document.body.classList.remove('nav-pad');
    }
  }
}

// sidebar page-jump-to-id navigation
function jumpToIdNav(el) {
  // add event functionality for sidebar navigation
  for (let i = 0; i < el.length; i++) {
    el[i].addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(e.target.hash.slice(1)).scrollIntoView({ behavior: 'smooth' });
      window.scrollBy(0, -140);
    });
  }
}

function sideBarHeight(el) {
  if (el.classList[2] === 'affix-top') {
    el.style.maxHeight = window.innerHeight + window.scrollY - 360 + 'px';
  }
}

const mainNav = document.getElementById('main-nav');
const imgRotateElement = document.getElementById('img-rotate');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar a');

window.onload = () => {
  console.log('hello');
  if (sidebar) {
    sideBarHeight(sidebar);
    jumpToIdNav(sidebarLinks);
  }
  if (imgRotateElement) rotateImages(imgRotateElement);
};

window.addEventListener('scroll', () => {
  if (sidebar) sideBarHeight(sidebar);
  respondToScroll(mainNav);
});

window.addEventListener('resize', () => {
  if (sidebar) sideBarHeight(sidebar);
});
