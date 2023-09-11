// Core
const gulp = require('gulp');
const fileSystem = require('fs');

// HTML
const fileInclude = require('gulp-file-include');
const htmlClean = require('gulp-htmlclean');
const webpHtml = require('gulp-webp-html');

// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');

const serverLiveReload = require('gulp-server-livereload');
const clean = require('gulp-clean');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const groupMedia = require('gulp-group-css-media-queries');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');

//Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

gulp.task('clean:docs', function(done){
    if (fileSystem.existsSync('./docs/')) {
        return gulp.src('./docs/', { read: false }).pipe(clean({ force: true }));
    }

    done();
});

const includeFilesSettings = {
    prefix: '@@',
    basepath: '@file'
};
const serverLiveReloadSettings = {
    livereload: true,
    open: true
};

const plumberNotifyTitle = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'ERROR <%= error.message %>',
            sound: false
        })
    };
}

gulp.task('html:docs', function(){
    return gulp
        .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./docs/'))
        .pipe(plumber(plumberNotifyTitle('HTML')))
        .pipe(fileInclude(includeFilesSettings))
        .pipe(webpHtml())
        .pipe(htmlClean())
        .pipe(gulp.dest('./docs/'));
});

gulp.task('sass:docs', function(){
    return gulp
        .src('./src/scss/*.scss')
        .pipe(changed('./docs/css/'))
        .pipe(plumber(plumberNotifyTitle('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(autoprefixer())
        .pipe(sassGlob())
        .pipe(webpCss())
        .pipe(groupMedia())
        .pipe(sass())
        .pipe(csso())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./docs/css/'));
});

gulp.task('images:docs', function(){
    return gulp
        .src('./src/img/**/*')
        .pipe(changed('./docs/img/'))
        .pipe(webp())
        .pipe(gulp.dest('./docs/img/'))
        .pipe(gulp.src('./src/img/**/*'))
        .pipe(changed('./docs/img/'))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./docs/img/'));
});

gulp.task('fonts:docs', function(){
    return gulp
        .src('./src/fonts/**/*')
        .pipe(changed('./docs/fonts/'))
        .pipe(gulp.dest('./docs/fonts/'));
});

gulp.task('files:docs', function(){
    return gulp
        .src('./src/files/**/*')
        .pipe(changed('./docs/files/'))
        .pipe(gulp.dest('./docs/files/'));
});

gulp.task('js:docs', function(){
    return gulp
        .src('./src/js/*.js')
        .pipe(changed('./docs/js/'))
        .pipe(plumber(plumberNotifyTitle('JS')))
        .pipe(babel())
        .pipe(webpack(require('../webpack.config.js')))
        .pipe(gulp.dest('./docs/js'));
})

gulp.task('server:docs', function(){
    return gulp
        .src('./docs/')
        .pipe(serverLiveReload(serverLiveReloadSettings));
});