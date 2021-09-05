// Import NPM Modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const prefix = require('gulp-autoprefixer');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const purgecss = require('gulp-purgecss');

// Const Paths
const paths = {
    "base" : "./", 
    "src" : {
        "base"  : "./src", 
        "js"    : "./src/js", 
        "scss" : "./src/scss/*.scss",
        "bahasa"   : "./src/scss/bahasa.scss",
        
    }, 
    "bahasa" : {
        "base" : "./bahasa/static",
        "css" : "./bahasa/static/css",
        "js" : "./bahasa/static/js",
        "html" : "./bahasa/templates/**/*.html"
    }
}



// Sass Task
function scssTask() {
    return src(paths.src.bahasa, { sourcemaps: true })
        .pipe(sass())
        .pipe(prefix())
        .pipe(postcss([cssnano()]))
        .pipe(dest(paths.bahasa.css, { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
    return src(paths.src.js +  '/scripts.js', { sourcemaps: true })
        .pipe(terser())
        .pipe(dest(paths.bahasa.js, { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch([paths.src.scss, paths.src.js + '/**/*.js'], series(scssTask, jsTask));
}

function buildTask() {
    return src(paths.src.css + '/styles.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(prefix())
        .pipe(postcss([cssnano()]))
        .pipe(purgecss({
            content:[paths.bahasa.html]
        }))
        .pipe(dest(paths.bahasa.css, { sourcemaps: '.' }));
}
// Default Gulp task
exports.default = series(
    scssTask,
    jsTask,
    watchTask
);

exports.build = buildTask;
exports.watch = watchTask;