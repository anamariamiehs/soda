var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var cleanCSS = require('gulp-clean-css');
var embedlr = require('gulp-embedlr');
var browserSync = require('browser-sync').create();

var autoRestart = require('gulp-auto-restart');
autoRestart({'task': 'watch'});

var resCss = [
        './src/less/bootstrap.less'
        ]

var css = [
		'./src/less/style-mixins.less',
		'./src/less/style.less'
		]

var resJs = [
        './src/js/button.js'
        ]

var js = [
        './src/script.js'
        ]


gulp.task('scripts', function() {
  gulp.src(resJs)
        .pipe(sourcemaps.init())
        .pipe(uglify({ mangle: false }))
        .pipe(concat('resources.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./dist/js'));

    gulp.src(js)
        .pipe(sourcemaps.init())
        .pipe(uglify({ mangle: false }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(refresh(server))
        .pipe(browserSync.stream({match: '**/*.js'}))
})


gulp.task('styles', function() {
    gulp.src(resCss)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(concat('resources.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./dist/css'));

    gulp.src(['./src/less/style.less'])
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
        .pipe(refresh(server))
        .pipe(browserSync.stream({match: '**/*.css'}))
})

gulp.task('fonts', function() {
  gulp.src('./src/fonts/**.*')
        .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('images', function() {
  gulp.src('./src/img/**.*')
        .pipe(gulp.dest('./dist/img'));
})


gulp.task('browser-sync', function() {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('html', function() {
    gulp.src("./src/index.html")
        .pipe(embedlr())
        .pipe(gulp.dest('./dist'))
        .pipe(refresh(server))
        .pipe(browserSync.stream({match: '**.html'}));
})

gulp.task('serve', function() {
    
    gulp.run('lr-server', 'fonts', 'scripts', 'styles', 'images', 'html', 'browser-sync');

    gulp.watch('./src/js/**', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('./src/less/**', function(event) {
        gulp.run('styles');
    })

    gulp.watch('./src/*.html', function(event) {
        gulp.run('html');
    })
})