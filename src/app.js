import css from './app.scss';

if (process.env.NODE_ENV !== 'production') {
  require('file-loader!./index.html');
  require('file-loader!./program.html');
  require('file-loader!./faq.html');
  require('file-loader!./learn.html');
  require('file-loader!./csx.html');
  require('file-loader!./cs-style-guide.html');
  require('file-loader!./events.html');
  require('file-loader!./blog.html');
}

const globalObject = typeof global !== 'undefined' ? global : this || window;
const doc = document.documentElement;
const body = document.body;

const queryElement = function (selector, parent) {
  const lookUp = parent ? parent : document;
  return typeof selector === 'object' ? selector : lookUp.querySelector(selector);
};

// AFFIX DEFINITION
const Affix = function (element, options) {
  // initialization element
  element = queryElement(element);

  // set options
  options = options || {};

  // read DATA API
  const targetData = element['getAttribute']('dataTarget');
  const offsetTopData = element['getAttribute']('data-offset-top');
  const offsetBottomData = element['getAttribute']('data-offset-bottom');

  // 'target' is an object
  this['target'] = options['target'] ? queryElement(options['target']) : queryElement(targetData) || null;
  // offset option is an integer number or function to determine that number
  this['offsetTop'] = options['offsetTop'] ? options['offsetTop'] : parseInt(offsetTopData) || 0;
  this['offsetBottom'] = options['offsetBottom'] ? options['offsetBottom'] : parseInt(offsetBottomData) || 0;

  if (!this['target'] && !(this['offsetTop'] || this['offsetBottom'])) {
    return;
  } // invalidate

  // internal bind
  const self = this;

  // constants
  const resizeDelay = 500;
  let affixedToTop = false;
  let affixedToBottom = false;

  let maxScroll;
  let pinnedTop;
  let pinnedBottom;

  const checkPosition = function () {
    maxScroll = getMaxScroll();
    const scrollY = parseInt(globalObject.pageYOffset || doc['scrollTop'], 0);
    const pinOffsetTop = getOffsetTop();
    const pinOffsetBottom = getOffsetBottom();
    pinnedTop = parseInt(pinOffsetTop) - scrollY < 0 && scrollY > parseInt(pinOffsetTop);
    pinnedBottom = parseInt(pinOffsetBottom) - scrollY < 0 && scrollY > parseInt(pinOffsetBottom);
  };

  // private methods
  const getMaxScroll = function () {
    return Math.max(
      body['scrollHeight'],
      body['offsetHeight'],
      doc['clientHeight'],
      doc['scrollHeight'],
      doc['offsetHeight']
    );
  };

  const getOffsetTop = function () {
    if (self['target'] !== null) {
      return self['target'][getBoundingClientRect]()['top'] + scrollY;
    } else if (self['offsetTop']) {
      return parseInt(typeof self['offsetTop'] === 'function' ? self['offsetTop']() : self['offsetTop'] || 0);
    }
  };

  const getOffsetBottom = function () {
    if (self['offsetBottom']) {
      return (
        maxScroll -
        element['offsetHeight'] -
        parseInt(typeof self['offsetBottom'] === 'function' ? self['offsetBottom']() : self['offsetBottom'] || 0)
      );
    }
  };

  const pinTop = function () {
    if (!affixedToTop && !element.classList.contains('affix')) {
      // on loading a page halfway scrolled these events don't trigger in Chrome
      element.classList.add('affix');
      affixedToTop = true;
    }
  };

  const unPinTop = function () {
    if (affixedToTop && element.classList.contains('affix')) {
      element.classList.remove('affix');
      affixedToTop = false;
    }
  };

  const pinBottom = function () {
    if (!affixedToBottom && !element.classList.contains('affix-bottom')) {
      element.classList.add('affix-bottom');
      affixedToBottom = true;
      element.style.position = 'relative';
      element.style.top = `${getOffsetBottom()}px`;
    }
  };

  const unPinBottom = function () {
    if (affixedToBottom && element.classList.contains('affix-bottom')) {
      element.classList.remove('affix-bottom');
      affixedToBottom = false;
      element.style.position = null;
      element.style.top = null;
    }
  };

  const updatePin = function () {
    if (pinnedBottom) {
      if (pinnedTop) {
        unPinTop();
      }
      pinBottom();
    } else {
      unPinBottom();
      if (pinnedTop) {
        pinTop();
      } else {
        unPinTop();
      }
    }
  };

  // public method
  this['update'] = function () {
    checkPosition();
    updatePin();
  };

  // init
  if (!('Affix' in element)) {
    // prevent adding event handlers twice
    globalObject.addEventListener('scroll', this['update'], false);
    globalObject.addEventListener(
      'resize',
      function () {
        setTimeout(function () {
          self['update']();
        }, resizeDelay);
      },
      false
    );
  }

  element['Affix'] = this;

  this['update']();
};

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

function respondToScroll2(params) {
  const elU = params.el;
  const classesU = params.classes || [''];
  const offsetTopU = params.offsetTop || 0;
  const offsetBottomU = params.offsetBottom || 0;
  const bodyClasses = params.bodyClasses || [''];

  if (elU) {
    if (window.scrollY > offsetTopU) {
      elU.classList.add(...classesU);
      body.classList.add(...bodyClasses);
    }
    if (window.scrollY < offsetBottomU) {
      elU.classList.add(...classesU);
      body.classList.add(...bodyClasses);
    } else {
      elU.classList.remove(...classesU);
      body.classList.remove(...bodyClasses);
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
  if (!el.classList.contains('affix') && !el.classList.contains('affix-bottom')) {
    el.style.maxHeight = window.innerHeight + window.scrollY - 360 + 'px';
  }
}

const mainNav = document.getElementById('main-nav');
const imgRotateElement = document.getElementById('img-rotate');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar a');

window.onload = () => {
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

const sideBarAffix = new Affix('#sidebar', {
  offsetTop: 165,
  offsetBottom: 550
});

console.log('x', sideBarAffix);
