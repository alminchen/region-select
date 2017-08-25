const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () => {
    gulp.src('src/region-select.js')
        .pipe(babel({
            presets: ['env', 'stage-0', 'react']
        }))
        .pipe(gulp.dest('dist'));
    gulp.src('src/regionDict.js')
        .pipe(gulp.dest('dist'));

});