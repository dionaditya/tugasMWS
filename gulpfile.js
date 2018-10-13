const gulp = require('gulp');
const image = require('gulp-image');
 
gulp.task('imag', function () {
  gulp.src('./img*')
    .pipe(image())
    .pipe(gulp.dest('./public/img'));
});
 
gulp.task('default', ['image']);