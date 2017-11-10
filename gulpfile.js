var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
cache = require('gulp-cache'),
browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})

gulp.task('markup', function() {
  return gulp.src('src/html/**/*.html')
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('styles', function() {
return gulp.src('src/scss/**/*.scss')
.pipe(sass({ style: 'expanded' ,
  includePaths: ['node_modules']
}))
.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
.pipe(gulp.dest('src/css'))
.pipe(browserSync.reload({
  stream: true
}))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
return gulp.src('src/js/**/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('dist'))
  .pipe(rename('scripts.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// Images
gulp.task('images', function() {
return gulp.src('src/img/**/*')
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// Watch
gulp.task('watch', ['browserSync', 'markup', 'styles', 'scripts', 'images' ], function() {

// Watch .html files
gulp.watch('src/html/**/*.html', ['markup']);

// Watch .scss files
gulp.watch('src/scss/**/*.scss', ['styles']);

// Watch .js files
gulp.watch('src/js/**/*.js', ['scripts']);

// Watch image files
gulp.watch('src/images/**/*', ['images']);
});
