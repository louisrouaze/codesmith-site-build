import css from './app.scss';

if (process.env.NODE_ENV !== 'production') {
  require('file-loader!./index.html');
  require('file-loader!./program.html');
}

function rotateImages(containerElement) {
  console.log('x', containerElement.getElementsByClassName)
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
function respondToScroll() {
  window.addEventListener('scroll', () => {
    const mainNav = document.getElementById('main-nav');
    const sidebar = document.getElementById('sidebar');

    if (window.scrollY > 30) {
      if (mainNav) mainNav.classList.add('on-scroll', 'navbar-fixed-top');
      document.body.classList.add('nav-pad');
      if (sidebar) sidebar.classList.add('on-scroll');
    } else {
      mainNav.classList.remove('on-scroll', 'navbar-fixed-top');
      document.body.classList.remove('nav-pad');
      if (sidebar) sidebar.classList.remove('on-scroll');
    }
  });
}

// sidebar page-jump-to-id navigation
function jumpToIdNav() {
  // populate sidebar navigation links for FAQ page
  const sidebarLinks = document.querySelectorAll('.sidebar a');

  // add event functionality for sidebar navigation
  for (let i = 0; i < sidebarLinks.length; i++) {
    sidebarLinks[i].addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(e.target.hash.slice(1)).scrollIntoView({ behavior: 'smooth' });
      window.scrollBy(0, -140);
    });
  }
}

window.onload = () => {
  const imgRotateElement = document.getElementById('img-rotate');

  respondToScroll();
  jumpToIdNav();

  if (imgRotateElement) rotateImages(imgRotateElement);
};

