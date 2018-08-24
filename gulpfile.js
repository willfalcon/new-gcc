const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// const jshint = require('gulp-jshint');
// I don't know how to use this. Halp.
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const streamqueue = require('streamqueue');
const livereload = require('gulp-livereload');


gulp.task('styles', () => {
  return streamqueue(
    { objectMode: true },
    gulp.src('./node_modules/normalize.css/normalize.css')
      .pipe(sourcemaps.init()),
    // Add other external stylesheets to concatenate here with gulp.src().
    gulp.src('assets/scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
  )
  .pipe(concat('main.css'))
  .pipe(gulp.dest('dist'))
  .pipe(postcss([
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ]))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'));
});

gulp.task('dev_styles', () => {
  return streamqueue(
    { objectMode: true },
    gulp.src('./node_modules/normalize.css/normalize.css')
      .pipe(sourcemaps.init()),
    // Add other external stylesheets to concatenate here with gulp.src().
    gulp.src('assets/scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
  )
  .pipe(concat('main.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'))
  .pipe(livereload());

});


gulp.task('dev_scripts',() => {
  return browserify({
    entries: ['./assets/index.js'],
    debug: true
  })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
        // Any tasks between sourcemaps.init and .write must be compatible with sourcemaps
        // https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support
      // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());

});

gulp.task('scripts', () => {

  return browserify({
    entries: ['./assets/index.js'],
    debug: true
  })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(babel())
      .pipe(gulp.dest('./dist/'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'));

});

gulp.task('refresh', () => {
  gulp.src('index.html')
    .pipe(livereload());
});

gulp.task('default', () => {
    gulp.start('styles', 'scripts' );
});

gulp.task('watch', () => {
  livereload.listen();

  // Watch .scss files
  gulp.watch('assets/scss/**/*.scss', ['dev_styles']);

  // Watch .js files
  gulp.watch('assets/**/*.js', ['dev_scripts']);

  // Watch .php files
  gulp.watch('**/*.html', ['refresh']);
});
