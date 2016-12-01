var gulp = require('gulp');
var browserSync = require('browser-sync').create();

/**
 * gulp postcss : https://www.npmjs.com/package/gulp-postcss
 */
var postcss = require('gulp-postcss');

var cssnext = require('postcss-cssnext');
var reporter = require('postcss-reporter');
var browserReporter = require('postcss-browser-reporter');

var stylelint = require('gulp-stylelint');

/** 
 * file paths stored in variables
 * ex. gulp.src(input) === gulp.src('./css/*.css')
 */
var input = './src/css/*.css';
var output = './dest/css';

// Static Server + watching scss/html files
gulp.task('serve', function() {
    browserSync.init({
        server: "./dest"
    });
    gulp.watch(input, ['style']);
    gulp.watch('./dest/css/main.css').on('change', browserSync.reload);
});

gulp.task('check', function() {
    return gulp.src(input)
        .pipe(stylelint({
            reporters: [{
                formatter: 'verbose',
                console: true
            }]
        }))
});

gulp.task('style', ['check'], function() {
    return gulp.src(input)
        .pipe(postcss([
            require('postcss-cssnext'),
        ]))
        .pipe(gulp.dest(output))
});

gulp.task('default', ['serve']);