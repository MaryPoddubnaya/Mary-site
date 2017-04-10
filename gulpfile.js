var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleancss = require('gulp-clean-css');
var less = require('gulp-less');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var minification = {
    compatibility: 'ie9',
    advanced: true,
    restructuring: false,
    aggressiveMerging: false
};

gulp.task('less', function() {
    gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie 9'] }) ]))
        .pipe(cleancss(minification))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/js/*.js', ['compress-js']);
});

gulp.task('compress-js', function() {
    gulp.src('src/js/*.js')
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest('js/'))
});

gulp.task('default', ['less', 'compress-js', 'watch' ], function() {
});
