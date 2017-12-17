const gulp = require('gulp'),
browserSync = require('browser-sync'),

sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
imagemin = require('gulp-imagemin'),
changed = require('gulp-changed'),
htmlReplace = require('gulp-html-replace'),
htmlMin = require('gulp-htmlmin'),
del = require('del'),
sequence = require('run-sequence'),

babel = require('gulp-babel'),
through = require('through2');

/*-------------------------------------------------------*/
const config = {
    dist: 'dist/',
    app: 'app/',
    cssin: 'app/css/**/*.css',
    jsin: 'app/ES6/**/*.js',
    imgin: 'app/images/**/*.{jpg,jpeg,png,gif,svg}',
    htmlin: 'app/*.html',
    scssin: 'app/scss/**/*.scss',
    cssout: 'dist/css/',
    js5out: 'app/js',
    jsout: 'dist/js/',
    imgout: 'dist/img/',
    htmlout: 'dist/',
    scssout: 'app/css/',
    cssoutname: 'style-min.css',
    jsoutname: 'script-min.js',
    cssreplaceout: 'css/style-min.css',
    jsreplaceout: 'js/script-min.js'
};

/*--------------------------------------------------------*/
gulp.task('reload', () => {
    browserSync.reload();
});

gulp.task('serve', ['sass'], () => {
    browserSync({
        server: config.app
    })
});


/*-----------------------------------------------------------------*/
gulp.watch([config.htmlin], ['reload']);
gulp.watch(config.scssin, ['sass']);
gulp.watch(config.jsin, ['babel']);


gulp.task("sass", function() {
    return gulp.src(config.scssin)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        // outputStyle: 'expanded',  rodzaj formatowania css
        // sourceComments: 'map'    czy wypisywac zrodla do scss
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(sourcemaps.write()) /*gulp sourcemap*/
        .pipe(gulp.dest(config.scssout))
        .pipe(browserSync.stream());

});

function logFileHelpers() {
    return through.obj((file, enc, cb) => {
        console.log(file.babel.usedHelpers);
        cb(null, file);
    });
}


gulp.task('babel', () => {
    gulp.src(config.jsin)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(config.js5out))
        .pipe(logFileHelpers())
        .pipe(browserSync.stream());
});


// FOLDER DIST


//minifikacja html------------------------------
gulp.task('html', function() {
    return gulp.src(config.htmlin)
        .pipe(htmlReplace({
            'css': config.cssreplaceout,
            'js': config.jsreplaceout
        }))
        .pipe(htmlMin({
            sortAttributes: true,
            sortClassName: true,
            // collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.dist))
});

// minifikacja CSS--------------------------------------
gulp.task('css', function() {
    return gulp.src(config.cssin)
        .pipe(concat(config.cssoutname)) //nadanie nazwy pliku sconcatenowanu
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.cssout));
});

// minifikacja JS--------------------------------------
gulp.task('js', function() {
    return gulp.src(config.js5out)
        .pipe(concat(config.jsoutname)) 
        .pipe(uglify())
        .pipe(gulp.dest(config.jsout));
});

//minimalize images------------------------------------------

gulp.task('img', function() {
  return gulp.src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});




// run delete ---------------------------

gulp.task('clean', ()=> {
    del([config.dist])
});
// run sequence---------------------------

gulp.task('build', ()=> {
    sequence('clean', ['css', 'js', 'html']);
});


gulp.task('default', ['serve']);