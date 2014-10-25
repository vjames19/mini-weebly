'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var map = require('map-stream');

var ignoreComponents = '!**/{node_modules,bower_components}/**';

gulp.task('server', ['watch'], function () {
  $.nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['node_modules/*']
  }).on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('styles', function() {
  return gulp.src([ignoreComponents, 'app/**/*.scss'])
      .pipe($.sass({style: 'expanded'}))
      .pipe($.autoprefixer('last 1 version'))
      .pipe(gulp.dest('.tmp'))
      .pipe($.size());
});

var lint = function() {
  return gulp.src([ignoreComponents, 'app/**/*.js'])
      .pipe($.cached('lint'))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'));
};

gulp.task('lint', lint);

var errorReporter = function () {
  return map(function (file, cb) {
    if (!file.jshint.success) {
      process.exit(1);
    }
    cb(null, file);
  });
};

gulp.task('lint-hook', function() {
  return lint().pipe(errorReporter());
});

gulp.task('scripts', function() {
  return gulp.src([ignoreComponents, 'app/**/*.js'])
      .pipe(gulp.dest('.tmp'))
      .pipe($.size());
});

gulp.task('partials', function() {
  return gulp.src([ignoreComponents, 'app/**/*.jade'])
      .pipe($.cached('partials'))
      .pipe($.jade({pretty: true}))
      .pipe($.remember('partials'))
      .pipe(gulp.dest('.tmp'))
      .pipe(gulp.dest('dist'));
});

gulp.task('html', ['styles', 'scripts', 'partials'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('.tmp/index.html')
      .pipe(assets)
      .pipe(jsFilter)
      .pipe($.cached('uglify'))
      .pipe($.ngAnnotate())
      .pipe($.uglify())
      .pipe($.remember('uglify'))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.cached('csso'))
      .pipe($.csso())
      .pipe($.remember('csso'))
      .pipe(cssFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe(gulp.dest('dist'))
      .pipe($.size());
});

gulp.task('fonts',  function () {
  return gulp.src('app/fonts/*.{eot,svg,ttf,woff}')
      .pipe(gulp.dest('dist/fonts'))
      .pipe($.size());
});


gulp.task('images', function () {
  return gulp.src([ignoreComponents, 'app/images/**/*'])
      .pipe($.cached('images'), {optimizeMemory: true})
      .pipe($.imagemin({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
      }))
      .pipe($.remember('images'))
      .pipe(gulp.dest('dist/images'))
      .pipe($.size());
});

gulp.task('clean', function (cb) {
  del(['.tmp', 'dist'], cb);
});

gulp.task('builder', ['html', 'images', 'fonts']);

gulp.task('build', function(cb) {
  runSequence('clean', 'builder', cb);
});

gulp.task('watch', ['build', 'lint'], function() {
  return gulp.watch([
    ignoreComponents,
    'app/**/*.js',
    'app/**/*.scss',
    'app/**/*.jade'
  ], ['build', 'lint']);
});

gulp.task('hook', function() {
  return gulp.src('.hooks/pre-commit')
      .pipe($.symlink('.git/hooks/', 'pre-commit'));
});
