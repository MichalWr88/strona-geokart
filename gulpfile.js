const gulp = require('gulp'),
browserSync = require('browser-sync'),
webpack = require('webpack'),
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
pump = require('pump'),
babel = require('gulp-babel'),
through = require('through2');

/*-------------------------------------------------------*/
const config = {
    dist: 'dist/',
    app: 'app/',
    fontsin:'app/fonts/**',
    fontsout:'dist/fonts/',
    cssin: 'app/css/**/*.css',
    jsin: 'app/ES6/**/*.js',
    imgin: 'app/images/**/*',
    htmlin: 'app/*.html',
    scssin: 'app/scss/**/*.scss',
    cssout: 'dist/css/',
    js5out: 'app/js/',
    js5in: 'app/js/**/*.js',
    jsout: 'dist/js/',
    imgout: 'dist/images/',
    htmlout: 'dist/',
    scssout: 'app/css/',
    cssoutname: 'main-min.css',
    jsoutname: 'script-min.js',
    cssreplaceout: 'css/main-min.css',
    jsreplaceout: 'js/script-min.js'
};

/*--------------------------------------------------------*/
gulp.task('reload', () => {
    browserSync.reload();
});

gulp.task('serve', ['sass','babel'], () => {
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
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write()) /*gulp sourcemap*/
        .pipe(gulp.dest(config.js5out))
        .pipe(logFileHelpers())
        .pipe(browserSync.stream());
});



gulp.task('webpack', function(done) {
  // run webpack
  webpack({
    entry: './app/ES6/script.js',
    output: {
      path: __dirname + '/app/js',
      filename: 'script.js'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          loader: 'babel',
          exclude: /node_modules/
        }
      ]
    }
  }, function(error) {
    var pluginError;

    if (error) {
      pluginError = new gulpUtil.PluginError('webpack', error);

      if (done) {
        done(pluginError);
      } else {
        gulpUtil.log('[webpack]', pluginError);
      }

      return;
    }

    if (done) {
      done();
    }
  });
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
            collapseWhitespace: true
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
    return gulp.src(config.js5in)
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

// run fonts ---------------------------
gulp.task('fonts', function() {
  return gulp.src(config.fontsin)
    .pipe(gulp.dest(config.fontsout));
});


// run delete ---------------------------

gulp.task('clean', ()=> {
    del([config.dist])
});
// run sequence---------------------------

gulp.task('build', ()=> {
    sequence('clean', ['fonts', 'img','css', 'js','html']);
});


gulp.task('default', ['serve']);