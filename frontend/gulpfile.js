'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/**/**/*.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('imagemin', function () {
  return gulp.src('./src/assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('default', gulp.series(['sass', 'imagemin']));