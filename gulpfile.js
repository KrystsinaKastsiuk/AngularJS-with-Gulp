var gulp = require('gulp'),
    connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 8000,
    host: '0.0.0.0'
  });
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('*.js')
    .pipe(connect.reload());
});

gulp.task('watch', ['html', 'js'], function() {
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['src/app/home/*.js'], ['js']);
});

gulp.task('default', ['webserver', 'watch']);