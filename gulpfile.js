const gulp = require('gulp')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const pipeline = require('readable-stream').pipeline

gulp.task('compress_js', function () {
  return pipeline(
    gulp.src(['src/js/js_variables.js', 'src/js/lang_mappings.js', 'src/js/html_holders.js', 'src/js/accessibility.js', 'src/js/GMap.js']),
    sourcemaps.init(),
    concat('all.js'),
    terser(),
    sourcemaps.write('.'),
    // uglify(),
    gulp.dest('public/js/')
  )
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

// const ejs = require('gulp-ejs')
// gulp.task('compress', function () {
//   gulp.src('./templates/*.ejs')
//     .pipe(ejs({
//       msg: 'Hello Gulp!'
//     }))
//     .pipe(gulp.dest('./dist'))
// })
