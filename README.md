# CSS-SASS Bootstrap Builder - Codesmith Website Build

A Webpack developement environment for compiling production CSS and JavaScript using Hot Module Replacement (HMR), SASS, the Twitter Bootstrap library, Pug/Jade, EJS, PurifyCSS, and more.

## How to begin?

1. Run `yarn install` to install all the dependencies
2. Run `yarn start` for development mode
3. New browser window should open automatically.

Build production files by running `yarn prod`.

## Known Issues

- If .jpg files are causing compile errors, run `brew install libpng`.
- New image files will not be recongnized until running `webpack` in terminal.
- Extra html/ejs templates must be mannually added to `webpack.config.js` and `src\app.js`.

## To-do

Urgent:
- Run production build by running `yarn prod` then replace .png photos (that are not logos) with compressed .jpg files
- Integrate into codemisth-public-site repo as an .ejs template (adjust proper routing)

Sooner:
- Update head meta icons
- lazy-loading functionality for homepage image slideshow.
- create fix to resize program.html's sidenav on overflow
- fix styling quirks with mobile nav
- Fix custom font not showing up on remote computers

Later:
- Smoother image-rotater
- Manually roll out JS functionality for main nav behaviors in order to drop Bootstrap's JS. Use bootstrap native (a vanilla js implementation of bootstrap's js) in the meantime.
- Refactor production stylesheet to symantic class names.
- Event Page
- Blog Feed Page
- Single Blog Post Page
- Global Style Guide
- Add validation to sign-up form on homepage
- Viewport-based margins
