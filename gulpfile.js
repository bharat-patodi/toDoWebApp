const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-minify');
const browserSync = require('browser-sync').create();

// CSS Fixing

function cssFixing() {
    return gulp.src('styles.css').pipe(autoprefixer()).pipe((minifyCSS())).pipe(gulp.dest('src/styles')).pipe(browserSync.stream());
};

function automatedCSSFixing() {
    return gulp.watch('styles.css', cssFixing);
};

// JS Fixing

function jsFixing() {
    return gulp.src('app.js').pipe(eslint()).pipe(minifyJS()).pipe(gulp.dest('src/js')).pipe(browserSync.stream());
}

function automatedJSFixing() {
    return gulp.watch('app.js', jsFixing);
}

// Browsersync
function browser_sync() {
    browserSync.init({
        // server: {
        //     baseDir: "./"
        // },
        proxy: "localhost:8000" // makes a proxy for the localhost
    });
    gulp.watch("*.html").on("change", browserSync.reload);
}

// Exports

exports.cssFixing = cssFixing;
exports.automatedCSSFixing = automatedCSSFixing;
exports.jsFixing = jsFixing;
exports.automatedJSFixing = automatedJSFixing;
// Default task
exports.default = gulp.parallel(automatedCSSFixing, automatedJSFixing, browser_sync);