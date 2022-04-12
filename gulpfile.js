const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const connect = require('gulp-connect');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

gulp.task('connect', async function(){
  connect.server({
    root: 'public',
    livereload: true,
    host: '0.0.0.0',
    port: 7777
  });
});

// keeps gulp from crashing for scss errors
gulp.task('sass', async function () {
  return gulp.src('./sass/*.scss')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(gulp.dest('./public/assets/css'));
});
gulp.task('livereload', async function (){
  gulp.src('./public/**/**/*')
  .pipe(connect.reload());
});
gulp.task('watch', async function () {
  gulp.watch('./sass/*.scss', gulp.series('sass', 'livereload'));
  gulp.watch('./public/**/**/*', gulp.series('livereload'));
});

gulp.task('scripts', () => {
  return gulp.src('./static/**/*.js')
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(gulp.dest('./public/assets/js/'));
});

gulp.task('default', gulp.series('connect', 'watch', 'sass', 'livereload', 'scripts', function() {
}));
