var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');

function scssConvert(done) {
    gulp.src('./scss/**/*')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());

    done();
};

function pugCompile(done) {
    gulp.src('./pug/**/*')
        .pipe(pug())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
    done();
}
function watchFiles() {
    gulp.watch("./scss/**/*", scssConvert);
    gulp.watch("./pug/**/*", pugCompile);

}
function sync(done){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

gulp.task('default', gulp.series(scssConvert, pugCompile, sync));
gulp.task('dev', gulp.parallel(sync, watchFiles));