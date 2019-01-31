import browserSync from 'browser-sync'
import del from 'del'
import fs from 'fs'
import pdf from 'pdfcrowd'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'
import { output as pagespeed } from 'psi'
import reporters from 'reporters'
import runSequence from 'run-sequence'
import swPrecache from 'sw-precache'
import pkg from './package.json'
import { exec } from 'child_process'

const $ = gulpLoadPlugins()
const reload = browserSync.reload
const jsSource = [
  './*.js',
  './**/*.js',
  'app/scripts/**/*.js',
  '!app/scripts/**/*.min.js'
]

// Load custom tasks from the `tasks` directory
try {
  require('require-dir')('tasks')
} catch (err) {
  console.error(err)
}

gulp.task('resume', () =>
  gulp
    .src('app/resume.html')
    .pipe($.rename('resume-dist.html'))
    .pipe($.removeCode({ resume: true }))
    .pipe(gulp.dest('app/'))
)

gulp.task('resume-doc', () =>
  gulp
    .src('app/resume.html')
    .pipe($.rename('resume-doc.html'))
    .pipe($.removeCode({ resumeDoc: true }))
    .pipe(gulp.dest('app/'))
)

// Lint JavaScript
gulp.task('prettier-scripts', () =>
  gulp
    .src(jsSource)
    .pipe(
      $.prettier({
        singleQuote: true,
        semi: false,
        write: true
      })
    )
    .pipe(gulp.dest(({ base }) => base))
)

// Optimize images
gulp.task('images', () =>
  gulp
    .src('app/images/**/*')
    .pipe(
      $.cache(
        $.imagemin({
          progressive: true,
          interlaced: true
        })
      )
    )
    .pipe(gulp.dest('dist/images'))
    .pipe(
      $.size({
        title: 'images'
      })
    )
)

// icons
gulp.task('icons', () =>
  gulp
    .src('app/icons/**/*')
    .pipe(gulp.dest('dist/icons'))
    .pipe(
      $.size({
        title: 'icons'
      })
    )
)

// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp
    .src(
      [
        'app/*',
        '!app/*.html',
        'node_modules/apache-server-configs/dist/.htaccess'
      ],
      {
        dot: true
      }
    )
    .pipe(gulp.dest('dist'))
    .pipe($.size({ title: 'copy' }))
)

// Copy web fonts to dist
gulp.task('pdf-make', cb => {
  // create an API client instance
  const client = new pdf.HtmlToPdfClient(
    'JacopKane',
    '9fe78e65f9e50026ef1236f561b48c3b'
  )

  client
    .setTitle('Furkan Tunali Resume')
    .setPageSize('A2')
    .setNoMargins(true)
    .convertUrlToFile(
      'https://furkantunali.com/resume-doc.html',
      'Furkan_Tunali_Resume.pdf',
      function(error, fileName) {
        if (error) return cb(error)
        console.info('Success: the file was created '.concat(fileName))
        cb()
      }
    )
})

gulp.task('pdf-move', ['pdf-make'], () =>
  gulp.src(['Furkan_Tunali_Resume.pdf']).pipe(gulp.dest('app/pdf'))
)

gulp.task('pdf-del', cb => del(['Furkan_Tunali_Resume.pdf'], {}, cb))

gulp.task('pdf', ['pdf-move'], () =>
  gulp
    .src(['app/pdf/**/*.pdf'])
    .pipe(gulp.dest('dist/pdf'))
    .pipe(
      $.size({
        title: 'pdf'
      })
    )
)

// Copy web fonts to dist
gulp.task('fonts', () =>
  gulp
    .src(['app/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({ title: 'fonts' }))
)

gulp.task('scss-lint-fix', cb => {
  exec('npm run sass-lint-auto-fix', (error, stdout, stderr) => {
    if (error) {
      return cb(error)
    }
    console.error(stderr)
    console.log(stdout)
    cb()
  })
})

gulp.task('prettier-sass', () =>
  gulp
    .src('app/styles/**/*.scss')
    .pipe(
      $.prettier({
        singleQuote: true,
        semi: false,
        write: true
      })
    )
    .pipe(gulp.dest(({ base }) => base))
)

gulp.task('scss-lint', ['prettier-sass', 'scss-lint-fix'], () =>
  gulp.src('app/styles/**/*.scss').pipe(
    $.scssLint({
      bundleExec: true
    })
  )
)

gulp.task('gulp-css-lint', () =>
  gulp
    .src('app/styles/**/*.css')
    .pipe($.csslint())
    .pipe($.csslint.reporter(reporters('gulp-csslint')))
)

// Compile and automatically prefix stylesheets
gulp.task('styles', ['scss-lint'], () =>
  gulp
    .src('app/styles/**/*.scss')
    .pipe(
      $.changed('.tmp/styles', {
        extension: '.css'
      })
    )
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        precision: 10
      }).on('error', reporters('gulp-sass'))
    )
    .pipe(
      $.autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('app/styles'))
    .pipe(
      $.size({
        title: 'styles'
      })
    )
)

// Concatenate and minify JavaScript
gulp.task('scripts', ['prettier-scripts'], () =>
  gulp
    .src([
      // Note: Since we are not using useref in the scripts build pipeline,
      //       you need to explicitly list your scripts here in the right order
      //       to be correctly concatenated
      './app/scripts/**/*.js'
      // Other scripts
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('main.min.js'))
    .pipe(
      $.babel(
        Object.assign(
          {
            plugins: ['transform-es2015-modules-systemjs']
          },
          JSON.parse(fs.readFileSync('.babelrc', 'utf8'))
        )
      )
    )
    .pipe($.uglify())
    // Output files
    .pipe($.sourcemaps.write())
    .pipe(
      $.size({
        title: 'scripts'
      })
    )
    .pipe(gulp.dest('dist/scripts'))
)

gulp.task('prettier-html', () =>
  gulp
    .src(['app/*.html', 'app/**/*.html'])
    .pipe(
      $.prettier({
        singleQuote: true,
        semi: false,
        write: true
      })
    )
    .pipe(gulp.dest(({ base }) => base))
)

// Scan your HTML for assets & optimize them
gulp.task('html', ['prettier-html'], () =>
  gulp
    .src('app/**/*.html')
    .pipe(
      $.useref({
        searchPath: '{.tmp,app}'
      })
    )
    // Remove any unused CSS
    // Note: If not using the Style Guide, you can delete it from
    //       the next line to only include styles your project uses.
    .pipe(
      $.if(
        '*.css',
        $.uncss({
          html: ['app/index.html', 'app/resume.html'],
          // CSS Selectors for UnCSS to ignore
          ignore: []
        })
      )
    )
    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.minifyCss()))

    // Minify any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output files
    .pipe(gulp.dest('dist'))
    .pipe(
      $.size({
        title: 'html'
      })
    )
)

// Clean output directory
gulp.task('clean', cb =>
  del(
    ['.tmp', '.publish', 'dist/*', '!dist/.git'],
    {
      dot: true
    },
    cb
  )
)

// Watch files for changes & reload
gulp.task('start', ['styles'], () => {
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
  })

  gulp.watch(['app/*.html', 'app/**/*.html'], ['prettier-html'])
  gulp.watch(['app/**/*.html'], reload)
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles'])
  gulp.watch(['app/styles/**/*.{scss,css}'], reload)
  gulp.watch(['app/resume.html'], ['resume', 'resume-doc', 'prettier-html'])
  gulp.watch(['app/images/**/*'], reload)
})

// Build and serve the output from the dist build
gulp.task('start:dist', ['default'], () =>
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
)

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    'vendor',
    ['styles', 'resume', 'resume-doc'],
    ['html', 'scripts', 'images', 'icons', 'fonts', 'copy'],
    'generate-service-worker',
    cb
  )
)

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  pagespeed(
    'furkantunali.com',
    {
      strategy: 'mobile'
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      // key: 'YOUR_API_KEY'
    },
    cb
  )
)

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', cb => {
  const rootDir = 'dist'

  let name = pkg.name || 'furkantunali.com'
  let version = pkg.version || '0'

  swPrecache.write(
    path.join(rootDir, 'service-worker.js'),
    {
      // Used to avoid cache conflicts when serving on localhost.
      cacheId: `${name}=v${version}`,
      log: $.util.log,
      staticFileGlobs: [
        // Add/remove glob patterns to match your directory setup.
        `${rootDir}/fonts/**/*`,
        `${rootDir}/pdf/**/*.pdf`,
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
    },
    err => {
      if (err) {
        cb(err)
        return
      }
      cb()
    }
  )
})

$.npmScriptSync(gulp)
