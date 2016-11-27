require('babel-core/register');

const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const mocha  = require('gulp-mocha');

const files = {
  sources: [
    'src/**/*.js'
  ],
  tests: [
    'test/**/*.js'
  ]
};

gulp.task('build', ['lint'], () => {
  return gulp.src(files.sources)
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['build']);

gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src([...files.sources, ...files.tests, '!node_modules/**'])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['build'], () =>
  gulp.src(...files.tests, {read: false})
  // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha())
);


gulp.task('watch', ['test'], () => {
  gulp.watch([...files.sources, ...files.tests], ['test']);
});