# Gulp Website Layout.

**Required for Windows OS:**
1. **[Visual Studio Code](https://code.visualstudio.com/)**
2. **[Node.js](https://nodejs.org/)**
3. **npm (Installed with Node.js)**

**Run project in Visual Studio Code, and type in terminal command for install all necessary packages:**<br>
`npm i gulp gulp-sass sass gulp-file-include gulp-clean gulp-server-livereload gulp-sourcemaps gulp-plumber gulp-notify gulp-group-css-media-queries webpack-stream style-loader css-loader gulp-babel @babel/core @babel/preset-env gulp-imagemin@7 gulp-changed gulp-sass-glob gulp-autoprefixer gulp-csso gulp-htmlclean gulp-webp gulp-webp-html gulp-webp-css --save-dev`

## Packages description

### Main packages
1. `gulp` — Gulp himself
2. `gulp-sass` — Build SASS / SCSS
3. `sass` — Needs for building SASS / SCSS
4. `gulp-file-include` — Connecting files to each other. HTML include
5. `gulp-clean` — Deleting files
6. `gulp-server-livereload` — Server with page autoreload
7. `gulp-sourcemaps` — Source maps for CSS
8. `gulp-plumber` — Fixing error during building
9. `gulp-notify` — Notifications
10. `gulp-group-css-media-queries` — Grouping CSS media queries

### Other packages
1. `webpack-stream style-loader css-loader` — Webpack packages for .js files
2. `gulp-babel @babel/core @babel/preset-env` — Adding support for older browsers versions
3. `gulp-imagemin@7` — Compressing image files (*for production version only*)
4. `gulp-changed` — Don't rebuilding src files if they not changed
5. `gulp-sass-glob` — Better way to build .scss, generates one .scss file from any others
6. `gulp-autoprefixer` — Adding autoprefixes
7. `gulp-csso` — Compressing .css files
8. `gulp-htmlclean` — Compressing .html files
9. `gulp-webp gulp-webp-html gulp-webp-css` — Adding .webp support for .html and .css files

# Run
Type in Visual Studio Code Terminal:
- `gulp` for **dev** build version
- `gulp docs` for **production** build version

***Note:*** Except **dev** version, in **production** version you will build full app with compressed .html, .scss, images and including .webp files. That's will may take many time.<br>
In **dev** version that's not including for faster build/rebuild.