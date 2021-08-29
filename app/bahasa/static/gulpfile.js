const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const prefix = require('gulp-autoprefixer');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
    return src('src/scss/styles.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(postcss([cssnano()]))
        .pipe(dest('css', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
    return src('src/js/scripts.js', { sourcemaps: true })
        .pipe(terser())
        .pipe(dest('js', { sourcemaps: '.' }));
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
    watch('../templates/*.html', browsersyncReload);
    watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
);