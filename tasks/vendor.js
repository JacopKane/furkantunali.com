import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins();

gulp.task('vendor-install', () => {
  return $.bower()
    .pipe(gulp.dest('app/vendor'))
    .pipe(gulp.dest('app/dist'))
    .pipe($.size({
      title : 'vendor-install'
    }))
});

gulp.task('vendor-update', () => {
  return $.bower({
    cmd : 'update'
  })
    .pipe(gulp.dest('app/vendor'))
    .pipe($.size({
      title : 'vendor-update'
    }));
});

gulp.task('vendor-js', () => {
  return gulp.src([
    './app/vendor/**/*.js'
  ])
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('dist/vendor'))
    .pipe($.size({
      title : 'vendor-js'
    }))
});

gulp.task('vendor-css', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 8',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src([
    'app/vendor/**/*.scss',
    'app/vendor/**/*.css'
  ])
    .pipe($.changed('.tmp/styles', {extension: '.css'}))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/vendor'))
    .pipe($.size({
      title : 'vendor-css'
    }));
});

gulp.task('vendor', ['clean'], (cb) => {
  return runSequence(
    'vendor-update',
    ['vendor-css', 'vendor-js'],
    'generate-service-worker',
    cb
  )
});
