# CSS-SASS Bootstrap Builder - Codesmith Website Build

A Webpack developement environment for compiling production CSS and JavaScript using Hot Module Replacement (HMR), SASS, the Twitter Bootstrap library, Pug/Jade, EJS, PurifyCSS, and more.

## How to begin?

1. Run `yarn install` to install all the dependencies
2. Run `yarn dev` for development mode
3. New browser window should open automatically.

Build production files by running `yarn prod`.

## Known Issues

- .JPG files are not being transpiled. Using .PNG files for now and manually replacing them with .JPG files until this is fixed.
- New image files will not be recongnized until running `webpack` in terminal.
- Extra html/ejs templates must be mannually added to `webpack.config.js` and `src\app.js`.

## To-do

- Refactor production stylesheet to symantic class names.
- JS functionality for homepage image slideshow.
- Manually roll out JS functionality for main nav behaviors in order to drop Bootstrap's JS.
- Event Page
- Blog Feed Page
- Single Blog Post Page
- Global Style Guide
- Update About page's images. 
