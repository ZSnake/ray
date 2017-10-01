const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const del = require('del');

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

gulp.task('clean-tests', () => {
  return del([
    'dist/tests/**/*',
  ]);
});

gulp.task('build-src', () => {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/src'));
});

gulp.task('build-tests', () => {
	return gulp.src('tests/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/tests'));
});

gulp.task('lint', () => {
	return gulp.src(['src/**/*.js', '!src/routes/routes.js', '!src/models/*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
});

const mocha = require('gulp-mocha');

gulp.task('run-tests', () =>
	gulp.src('./dist/tests/**/*.test.js', {read: false})
		.pipe(mocha({reporter: 'spec'}))
);

gulp.task('build', () => {
  runSequence(['lint', 'clean-src'], ['build-src', 'build-server']);
});

gulp.task('build-and-test', () => {
  runSequence('build','clean-tests', 'build-tests', 'run-tests')
});