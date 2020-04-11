const { src, dest, parallel } = require('gulp');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

function css() {
    return src(['css/default.css', 'css/main.css'])
        .pipe(cleanCSS())
        .pipe(dest('dist/css'))
}

function js() {
    return src(['js/main.js'])
        .pipe(minify({
            noSource: true,
            ext:{
                min:'.js'
            },
        }))
        .pipe(dest('dist/js'))
}

function html() {
    return src(['index.html'])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'))
}

function img() {
    return src(['img/*.svg', 'img/*.png', 'img/*.jpg'])
        .pipe(dest('dist/img'))
}

function assets() {
    return src(['assets/*.ttf', 'assets/*.pdf'])
        .pipe(dest('dist/assets'))
}

exports.css = css;
exports.js = js;
exports.html = html;
exports.img = img;
exports.assets = assets;
exports.default = parallel(css, js, html, img, assets);
