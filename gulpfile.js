var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');

gulp.task("lint", function() {
    return gulp.src(["lib/**/*.js"]).
        pipe(eslint({
            globals: {
                "require": false,
                "module": false
            },
            reset: true, 
            useEslintrc: true
        })).
        pipe(eslint.format()).
        pipe(eslint.failAfterError());
});

gulp.task('test', function (cb) {
  gulp.src(['./test/index.js'])
    .pipe(mocha())
    .on('end', cb);
});
