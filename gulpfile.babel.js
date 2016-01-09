/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import browserSync  from 'browser-sync';
import del  from 'del';
import fs  from 'fs';
import gulp  from 'gulp';
import gulpLoadPlugins  from 'gulp-load-plugins';
import path  from 'path';
import { output as pagespeed } from 'psi';
import reporters  from 'reporters';
import runSequence  from 'run-sequence';
import swPrecache  from 'sw-precache';
import pkg  from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }


gulp.task('resume', () => {
  return gulp.src('app/resume.html')
    .pipe($.rename('resume-doc.html'))
    .pipe($.removeCode({ document: true }))
    .pipe(gulp.dest('app/'));
});

// Lint JavaScript
gulp.task('jshint', () =>
  gulp.src([
    'app/scripts/**/*.js',
    '!app/scripts/**/*.min.js'
  ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter(reporters('gulp-jshint')))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
);

// Optimize images
gulp.task('images', () =>
  gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
);

// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src([
    'app/*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
);

// Copy web fonts to dist
gulp.task('fonts', () =>
  gulp.src(['app/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({title: 'fonts'}))
);


gulp.task('scss-lint', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.scssLint());
});

gulp.task('gulp-css-lint', () => {
  return gulp.src('app/styles/**/*.css')
    .pipe($.csslint())
    .pipe($.csslint.reporter(reporters('gulp-csslint')));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', ['scss-lint'], () => {
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

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src('app/styles/**/*.scss')
    .pipe($.changed('.tmp/styles', {
      extension: '.css'
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', reporters('gulp-sass')))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size({
      title: 'styles'
    }));
});

// Concatenate and minify JavaScript
gulp.task('scripts', () => {
  gulp.src([
    // Note: Since we are not using useref in the scripts build pipeline,
    //       you need to explicitly list your scripts here in the right order
    //       to be correctly concatenated
    './app/scripts/**/*.js'
    // Other scripts
  ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('main.min.js'))
    .pipe($.babel(Object.assign({
      'plugins' : ['transform-es2015-modules-systemjs']
    }, JSON.parse(fs.readFileSync('.babelrc', 'utf8')))))
    .pipe($.uglify())
    // Output files
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size({
      title: 'scripts'
    }));
});

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src('app/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}'
    }))
    // Remove any unused CSS
    // Note: If not using the Style Guide, you can delete it from
    //       the next line to only include styles your project uses.
    .pipe($.if('*.css', $.uncss({
      html: [
        'app/index.html',
        'app/resume.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: []
    })))

    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.minifyCss()))

    // Minify any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output files
    .pipe(gulp.dest('dist'))
    .pipe($.size({
      title: 'html'
    }));
});

// Clean output directory
gulp.task('clean', cb => del([
  '.tmp', '.publish', 'dist/*', '!dist/.git'
], {
  dot : true
}, cb));

// Watch files for changes & reload
gulp.task('serve', ['styles'], () => {
  browserSync({
    open: false,
    notify: true,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], [
    'scss-lint', 'styles', reload
  ]);
  gulp.watch(['app/resume.html'], ['resume']);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    baseDir: 'dist',
    open: false
  })
);

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    'vendor',
    ['styles', 'resume'],
    ['scss-lint', 'jshint', 'html', 'scripts', 'images', 'fonts', 'copy'],
    'generate-service-worker',
    cb
  )
);

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  // Update the below URL to the public URL of your site
  pagespeed('furkantunali.com', {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb)
);

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', cb => {
  const rootDir = 'dist';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'furkantunali.com',
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/fonts/**/*.woff`,
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/vendor/**/*.js`,
      `${rootDir}/vendor/**/*.css`,
      `${rootDir}/vendor/**/*.{html,json}`,
      `${rootDir}/fonts/**/*`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    stripPrefix: path.join(rootDir, path.sep)
  }, (err, swFileContents) => {
    if (err) {
      cb(err);
      return;
    }
    cb();
  });
});
