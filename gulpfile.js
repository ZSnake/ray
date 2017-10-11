const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const del = require('del');
const mocha = require('gulp-mocha');
const zip = require('gulp-zip');
const copy = require('gulp-copy');
const fs = require('fs');
const gutil = require('gulp-util');

gulp.task('build-server', () => {
	return gulp.src('server.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'));
});

gulp.task('clean-src', () => {
  return del([
    'dist/src/**/*',
  ]);
});

gulp.task('copy-package.json', () => {
  return gulp
  .src('./package.json')
  .pipe(copy('./dist'));
})

gulp.task('build-src', () => {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/src'));
});

gulp.task('lint', () => {
	return gulp.src(['src/**/*.js', '!src/routes/routes.js', '!src/models/*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
});


gulp.task('build', () => {
  runSequence(['lint', 'clean-src'], ['build-src', 'build-server', 'copy-package.json']);
});
