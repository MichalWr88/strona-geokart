var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('reload', function() {
    browserSync.reload();
});

/*odpalenie gulpa*/
gulp.task('serve', ['sass'], function() {

    browserSync({
        server: './app'
    })
});


/*-----------------------------------------------------------------*/
gulp.watch('./app/*html', ['reload']);
gulp.watch('./app/scss/**/*.scss', ['sass']);


/*gulp kompilujacy pliki scss na css*/

gulp.task("sass", function() {
    return gulp.src('./app/scss/**/*.scss')


        .pipe(sourcemaps.init()) /*gulp sourcemap*/
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        // outputStyle: 'expanded',  rodzaj formatowania css
        // sourceComments: 'map'	czy wypisywac zrodla do scss
        .pipe(sourcemaps.write()) /*gulp sourcemap*/
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());

});




gulp.task('default', ['serve'], function() {

});