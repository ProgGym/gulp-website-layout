const gulp = require('gulp');
const fileSystem = require('fs');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const serverLiveReload = require('gulp-server-livereload');
const clean = require('gulp-clean');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const changed = require('gulp-changed');

gulp.task('clean:dev', function(done){
    if (fileSystem.existsSync('./build/')) {
        return gulp.src('./build/', { read: false }).pipe(clean({ force: true }));
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

gulp.task('html:dev', function(){
    return gulp
        .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./build/', { hasChanged: changed.compareContents }))
        .pipe(plumber(plumberNotifyTitle('HTML')))
        .pipe(fileInclude(includeFilesSettings))
        .pipe(gulp.dest('./build/'));
});

gulp.task('sass:dev', function(){
    return gulp
        .src('./src/scss/*.scss')
        .pipe(changed('./build/css/'))
        .pipe(plumber(plumberNotifyTitle('Styles')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('images:dev', function(){
    return gulp
        .src('./src/img/**/*')
        .pipe(changed('./build/img/'))
        // .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts:dev', function(){
    return gulp
        .src('./src/fonts/**/*')
        .pipe(changed('./build/fonts/'))
        .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('files:dev', function(){
    return gulp
        .src('./src/files/**/*')
        .pipe(changed('./build/files/'))
        .pipe(gulp.dest('./build/files/'));
});

gulp.task('js:dev', function(){
    return gulp
        .src('./src/js/*.js')
        .pipe(changed('./build/js/'))
        .pipe(plumber(plumberNotifyTitle('JS')))
        // .pipe(babel())
        .pipe(webpack(require('./../webpack.config.js')))
        .pipe(gulp.dest('./build/js'));
})

gulp.task('server:dev', function(){
    return gulp
        .src('./build/')
        .pipe(serverLiveReload(serverLiveReloadSettings));
});

gulp.task('watch:dev', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
    gulp.watch('./src/html/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
    gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});