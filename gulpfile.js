const gulp = require('gulp')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const pipeline = require('readable-stream').pipeline
const rev = require('gulp-rev')

gulp.task('compress_js', function () {
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

gulp.task('version_dependencies', function () {
  gulp.src('public/js/libraries/*')
    .pipe(gulp.dest('public/js/libraries/'))
    .pipe(RevAll.revision({ hashLength: 10 }))
    .pipe(gulp.dest('public/js/libraries/'))
    .pipe(RevAll.manifestFile())
    .pipe(gulp.dest('public/js/libraries/'))
})

// const ejs = require('gulp-ejs')
// gulp.task('compress', function () {
//   gulp.src('./templates/*.ejs')
//     .pipe(ejs({
//       msg: 'Hello Gulp!'
//     }))
//     .pipe(gulp.dest('./dist'))
// })
