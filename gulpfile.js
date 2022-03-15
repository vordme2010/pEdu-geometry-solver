const gulp = require('gulp');
const createGulpSass = require('gulp-sass');
const sassEngine = require('sass');
const sass = createGulpSass(sassEngine);
const del = require('del');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglifyJs = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const purgeCss = require('gulp-purgecss');


const compilation = function() {
    gulp.src("src/**/*.html")
        .pipe(gulp.dest("./dist/"))
    gulp.src('./libraries/**/*.js')
        .pipe(gulp.dest('./dist/libraries/'))
    gulp.src('./src/scripts/**/*.js')
        // .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/scripts/'))
    return gulp.src('./src/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(browserSync.stream());
}
gulp.task('build', function() {
    del.sync('dist');
    // gulp.src('./src/**/*.js')
    //     .pipe(uglifyJs()) -----------fix
    gulp.src('./src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'))
    gulp.src('./src/styles/styles.scss')
        .pipe(purgeCss({
            content: ['src/**/*.html']
        }))
    compilation()
})
gulp.task('dev', function() {
    browserSync.init({
        server: "./dist"
    });
    compilation()
    gulp.watch(['./src/**/*.scss', './src/**/*.js', "./src/*.html", './src/img/*'], compilation);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});