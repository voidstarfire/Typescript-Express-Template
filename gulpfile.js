var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var cp = require('child_process');
var tsb = require('gulp-tsb');


// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
gulp.task('less', function () {
    return gulp.src('./src/styles/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('build/public/stylesheets'));
});

// Move view files across
gulp.task('views', function () {
    return gulp.src('./src/views/**/*.jade')
        .pipe(gulp.dest('build/views/'));
});


// run browser-sync on for client changes
gulp.task('browser-sync', ['nodemon', 'watch'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["build/public/**/*.*", "build/views/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
});

// run nodemon on server file changes
gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: 'build/www.js',
        watch: ['build/*.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);  // browserSync reload delay
    });
});

// TypeScript build for /src folder, pipes in .d.ts files from typings folder 
var tsConfigSrc = tsb.create('src/tsconfig.json');
gulp.task('build', function () {
    return gulp.src(['typings/**/*.ts', 'views/**/*', 'src/**/*.ts'])
        .pipe(tsConfigSrc()) 
        .pipe(gulp.dest('build'));
});

// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['build']);
    gulp.watch('tests/**/*.ts', ['buildTests']);
    gulp.watch('src/styles/**/*.less', ['less']);
}); 

gulp.task('buildAll', ['build', 'less', 'views']);
gulp.task('default', ['browser-sync']);
