const gulp = require('gulp')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const pipeline = require('readable-stream').pipeline
const rev = require('gulp-rev')

// var del = require('del')

// gulp.task('clean:mobile', function () {
//   return del([
//     'dist/report.csv',
//     // here we use a globbing pattern to match everything inside the `mobile` folder
//     'dist/mobile/**/*',
//     // we don't want to clean this file though so we negate the pattern
//     '!dist/mobile/deploy.json'
//   ])
// })
const clean = require('gulp-clean')
gulp.task('clean', function () {
  return gulp.src(['public/js/all*', 'public/js/rev-manifest.json'], { read: false })
    .pipe(clean())
})

gulp.task('compress_js', async function () {
  gulp.src(['src/js/js_variables.js', 'src/js/lang_mappings.js', 'src/js/html_holders.js', 'src/js/accessibility.js', 'src/js/GMap.js'])
    .pipe(sourcemaps.init())
    .pipe(concat({ path: 'all.js', cwd: '' }))
    .pipe(terser())
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/js/'))
})

const imagemin = require('gulp-imagemin')

gulp.task('compress_images', async function () {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img/'))
})

const gzip = require('gulp-gzip')

gulp.task('compress', function () {
  gulp.src('./files/*')
    .pipe(gzip())
    .pipe(gulp.dest('data/'))
})

const RevAll = require('gulp-rev-all')

gulp.task('version_dependencies', async function () {
  gulp.src('src/js/libraries/*')
    .pipe(RevAll.revision({ hashLength: 10 }))
    .pipe(gulp.dest('public/js/libraries/'))
    .pipe(RevAll.manifestFile())
    .pipe(gulp.dest('public/js/libraries/'))
})

const licenseFind = require('gulp-license-finder')
gulp.task('licenses', function() {
  return licenseFind()
    .pipe(gulp.dest('./audit'))
})

// const ejs = require('gulp-ejs')
// gulp.task('compress', function () {
//   gulp.src('./templates/*.ejs')
//     .pipe(ejs({
//       msg: 'Hello Gulp!'
//     }))
//     .pipe(gulp.dest('./dist'))
// })
