var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer');

    config = {
        stylus: './css/**/*.styl',
        stylusMain: './css/style.styl'
    };

gulp.task('stylus',() => {
    gulp.src(config.stylusMain)
    .pipe(stylus())
    .pipe(autoprefixer({browsers: ['last 2 version']}))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch(config.stylus, ['stylus']);
});