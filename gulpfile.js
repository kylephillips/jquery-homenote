var gulp = require('gulp');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var js_source = 'js/jquery.homenote.js';
var js_compiled = 'js';

/**
* Minify the JS
*/
gulp.task('scripts', function(){
	return gulp.src(js_source)
		.pipe(concat('jquery.homenote.min.js'))
		.pipe(gulp.dest(js_compiled))
		.pipe(uglify())
		.pipe(gulp.dest(js_compiled))
		.pipe(notify('Home Note scripts compiled & compressed.'));
});


/**
* Watch Task
*/
gulp.task('watch', function(){
	gulp.watch(js_source, ['scripts']);
});

/**
* Default
*/
gulp.task('default', ['scripts', 'watch']);