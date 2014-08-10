var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('minimize', function() {
    return gulp.src('queryExtend.js')
        .pipe(uglify())
        .pipe(concat('queryExtend.min.js'))
        .pipe(gulp.dest(''));
});

gulp.task('default', ['minimize']);