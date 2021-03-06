import browserSync from "browser-sync";
import del from "del";
import fs from "fs";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import path from "path";
import reporters from "reporters";
import runSequence from "run-sequence";
import swPrecache from "sw-precache";
import pkg from "./package.json";
import { exec } from "child_process";

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const jsSource = [
  "./*.js",
  "./**/*.js",
  "app/scripts/**/*.js",
  "!app/scripts/**/*.min.js"
];

// Load custom tasks from the `tasks` directory
// try {
//   require("require-dir")("tasks");
// } catch (err) {
//   console.error(err);
// }

gulp.task("resume", () =>
  gulp
    .src("app/resume.html")
    .pipe($.rename("resume-dist.html"))
    .pipe($.removeCode({ resume: true }))
    .pipe(gulp.dest("app/"))
);

gulp.task("resume-doc", () =>
  gulp
    .src("app/resume.html")
    .pipe($.rename("resume-doc.html"))
    .pipe($.removeCode({ resumeDoc: true }))
    .pipe(gulp.dest("app/"))
);

// Lint JavaScript
gulp.task("prettier-scripts", () =>
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
);

// Optimize images
gulp.task("images", () =>
  gulp
    .src("app/images/**/*")
    .pipe(
      $.cache(
        $.imagemin({
          progressive: true,
          interlaced: true
        })
      )
    )
    .pipe(gulp.dest("dist/images"))
    .pipe(
      $.size({
        title: "images"
      })
    )
);

// icons
gulp.task("icons", () =>
  gulp
    .src("app/icons/**/*")
    .pipe(gulp.dest("dist/icons"))
    .pipe(
      $.size({
        title: "icons"
      })
    )
);

// Copy all files at the root level (app)
gulp.task("copy", () =>
  gulp
    .src(
      [
        "app/*",
        "!app/*.html",
        "node_modules/apache-server-configs/dist/.htaccess"
      ],
      {
        dot: true
      }
    )
    .pipe(gulp.dest("dist"))
    .pipe($.size({ title: "copy" }))
);

// Copy web fonts to dist
gulp.task("fonts", () =>
  gulp
    .src(["app/fonts/**"])
    .pipe(gulp.dest("dist/fonts"))
    .pipe($.size({ title: "fonts" }))
);

gulp.task("scss-lint-fix", cb => {
  exec("npm run sass-lint-auto-fix", (error, stdout, stderr) => {
    if (error) {
      return cb(error);
    }
    console.error(stderr);
    console.log(stdout);
    cb();
  });
});

gulp.task("prettier-sass", () =>
  gulp
    .src("app/styles/**/*.scss")
    .pipe(
      $.prettier({
        singleQuote: true,
        semi: false,
        write: true
      })
    )
    .pipe(gulp.dest(({ base }) => base))
);

gulp.task("scss-lint", ["prettier-sass", "scss-lint-fix"], () =>
  gulp.src("app/styles/**/*.scss").pipe(
    $.scssLint({
      bundleExec: true
    })
  )
);

gulp.task("gulp-css-lint", () =>
  gulp
    .src("app/styles/**/*.css")
    .pipe($.csslint())
    .pipe($.csslint.reporter(reporters("gulp-csslint")))
);

// Compile and automatically prefix stylesheets
gulp.task("styles", ["scss-lint"], () =>
  gulp
    .src("app/styles/**/*.scss")
    .pipe(
      $.changed(".tmp/styles", {
        extension: ".css"
      })
    )
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        precision: 10
      }).on("error", reporters("gulp-sass"))
    )
    .pipe(
      $.autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(".tmp/styles"))
    // Concatenate and minify styles
    .pipe($.if("*.css", $.minifyCss()))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest("dist/styles"))
    .pipe(gulp.dest("app/styles"))
    .pipe(
      $.size({
        title: "styles"
      })
    )
);

// Concatenate and minify JavaScript
gulp.task("scripts", () =>
  gulp
    .src([
      // Note: Since we are not using useref in the scripts build pipeline,
      //       you need to explicitly list your scripts here in the right order
      //       to be correctly concatenated
      "./app/scripts/**/*.js"
      // Other scripts
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat("main.min.js"))
    .pipe(
      $.babel(
        Object.assign(
          {
            plugins: ["transform-es2015-modules-systemjs"]
          },
          JSON.parse(fs.readFileSync(".babelrc", "utf8"))
        )
      )
    )
    .pipe($.uglify())
    // Output files
    .pipe($.sourcemaps.write())
    .pipe(
      $.size({
        title: "scripts"
      })
    )
    .pipe(gulp.dest("dist/scripts"))
);

gulp.task("prettier-html", () =>
  gulp
    .src(["app/*.html", "app/**/*.html"])
    .pipe(
      $.prettier({
        singleQuote: true,
        semi: false,
        write: true
      })
    )
    .pipe(gulp.dest(({ base }) => base))
);

// Scan your HTML for assets & optimize them
gulp.task("html", ["prettier-html"], () =>
  gulp
    .src("app/**/*.html")
    .pipe(
      $.useref({
        searchPath: "{.tmp,app}"
      })
    )
    // Remove any unused CSS
    // Note: If not using the Style Guide, you can delete it from
    //       the next line to only include styles your project uses.
    .pipe(
      $.if(
        "*.css",
        $.uncss({
          html: ["app/index.html", "app/resume.html"],
          // CSS Selectors for UnCSS to ignore
          ignore: []
        })
      )
    )
    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if("*.css", $.minifyCss()))

    // Minify any HTML
    .pipe($.if("*.html", $.minifyHtml()))
    // Output files
    .pipe(gulp.dest("dist"))
    .pipe(
      $.size({
        title: "html"
      })
    )
);

// Clean output directory
gulp.task("clean", cb =>
  del(
    [".tmp", ".publish", "dist/*", "!dist/.git"],
    {
      dot: true
    },
    cb
  )
);

gulp.task("workspaces-start", $.shell.task("yarn workspaces run start"));

// Watch files for changes & reload
gulp.task("start", ["workspaces-start", "styles"], () => {
  browserSync({
    open: false,
    notify: true,
    // Customize the BrowserSync console logging prefix
    logPrefix: "WSK",
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: [".tmp", "app"]
  });

  gulp.watch(["app/*.html", "app/**/*.html"], ["prettier-html"]);
  gulp.watch(["app/**/*.html"], reload);
  gulp.watch(["app/styles/**/*.{scss,css}"], ["styles"]);
  gulp.watch(["app/styles/**/*.{scss,css}"], reload);
  gulp.watch(["app/resume.html"], ["resume", "resume-doc", "prettier-html"]);
  gulp.watch(["app/images/**/*"], reload);
});

// Build production files, the default task
gulp.task("default", ["clean"], cb =>
  runSequence(
    "vendor",
    ["styles", "resume", "resume-doc"],
    ["html", "scripts", "images", "icons", "fonts", "copy"],
    "generate-service-worker",
    cb
  )
);

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task("generate-service-worker", cb => {
  const rootDir = "dist";

  let name = pkg.name || "furkantunali.com";
  let version = pkg.version || "0";

  swPrecache.write(
    path.join(rootDir, "service-worker.js"),
    {
      // Used to avoid cache conflicts when serving on localhost.
      cacheId: `${name}=v${version}`,
      log: $.util.log,
      staticFileGlobs: [
        // Add/remove glob patterns to match your directory setup.
        `${rootDir}/fonts/**/*`,
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
        cb(err);
        return;
      }
      cb();
    }
  );
});

/* vendor */
gulp.task("vendor-install", () => {
  return $.bower()
    .pipe(gulp.dest("app/vendor"))
    .pipe(
      $.size({
        title: "vendor-install"
      })
    );
});

gulp.task("vendor-update", () => {
  return $.bower({
    cmd: "update"
  })
    .pipe(gulp.dest("app/vendor"))
    .pipe(
      $.size({
        title: "vendor-update"
      })
    );
});

gulp.task("vendor-js", () => {
  return gulp
    .src(["./app/vendor/**/*.js"])
    .pipe($.uglify({ preserveComments: "some" }))
    .pipe(gulp.dest("dist/vendor"))
    .pipe(
      $.size({
        title: "vendor-js"
      })
    );
});

gulp.task("vendor-css", () => {
  const AUTOPREFIXER_BROWSERS = [
    "ie >= 8",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
  ];

  return (
    gulp
      .src(["app/vendor/**/*.scss", "app/vendor/**/*.css"])
      .pipe($.changed(".tmp/styles", { extension: ".css" }))
      .pipe($.sourcemaps.init())
      .pipe(
        $.sass({
          precision: 10
        }).on("error", $.sass.logError)
      )
      .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(".tmp/styles"))
      // Concatenate and minify styles
      .pipe($.if("*.css", $.minifyCss()))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest("dist/vendor"))
      .pipe(
        $.size({
          title: "vendor-css"
        })
      )
  );
});

gulp.task("vendor", cb => {
  return runSequence("vendor-update", ["vendor-css", "vendor-js"], cb);
});

/* deploy */
gulp.task("deploy-firebase", $.shell.task("firebase deploy"));

gulp.task("deploy", cb => runSequence("default", "deploy-firebase", cb));

$.npmScriptSync(gulp);
