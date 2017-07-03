import css from './app.scss';

// const bsn = require('bootstrap.native');

if (process.env.NODE_ENV !== 'production') {
  require('file-loader!./index.html');
  require('file-loader!./program.html');
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
function respondToScroll() {
  window.addEventListener('scroll', () => {
    const mainNav = document.getElementById('main-nav');

    // if (sidebar) {
    //   const relHeight = document.documentElement.scrollHeight - sidebar.clientHeight - 600;
      
    //   if (window.scrollY > relHeight) {
    //     sidebar.style.position = 'absolute';
    //     sidebar.style.top = relHeight + 'px';
    //   } else {
    //     sidebar.style.position = 'fixed';
    //     sidebar.style.top = 'inherit';
    //   }
    // }

    if (mainNav) {
      if (window.scrollY > 30) {
        mainNav.classList.add('on-scroll', 'navbar-fixed-top');
        document.body.classList.add('nav-pad');
      } else {
        mainNav.classList.remove('on-scroll', 'navbar-fixed-top');
        document.body.classList.remove('nav-pad');
      }
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
  // const programSideNav = document.getElementById('sidebar');

  // const programSideNavInit = new bsn.Affix(programSideNav, {
  //   offsetBottom: 550
  // });
  // programSideNavInit.update();

  respondToScroll();
  jumpToIdNav();
  if (imgRotateElement) rotateImages(imgRotateElement);
  
};