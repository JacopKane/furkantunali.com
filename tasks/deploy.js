import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins();

gulp.task('deploy-github', () => {
  return gulp.src('dist/**/*')
    .pipe($.ghPages({
      force : true
    }));
});

gulp.task('deploy', (cb) => {
  return runSequence(
    'default',
    'deploy-github',
    'pagespeed',
    cb
  );
});

gulp.task('deploy-pdf', (cb) => {
  return runSequence(
    'pdf',
    'pdf-del',
    'generate-service-worker',
    'deploy-github',
    cb
  );
});
