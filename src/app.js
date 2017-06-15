// add all custom vanilla js functionality here

import css from './app.scss';

if (process.env.NODE_ENV !== 'production') {
  require('file-loader!./index.html');
  require('file-loader!./faq.html');
}

window.onload = () => {
  // when the window scrolls past 30pixels, the main nav becomes fixed
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

  // populate sidebar navigation links for FAQ page
  const sidebarLinks = document.querySelectorAll('.sidebar a');

  // add event functionality for sidebar navigation
  for (let i = 0; i < sidebarLinks.length; i++) {
    sidebarLinks[i].addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(e.target.hash.slice(1)).scrollIntoView({ behavior: 'smooth' });
      window.scrollBy(0, -140);
    });
  }
};
