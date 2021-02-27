const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const pipeline = require('readable-stream').pipeline

gulp.task('compress', function () {
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

// const ejs = require('gulp-ejs')
// gulp.task('compress', function () {
//   gulp.src('./templates/*.ejs')
//     .pipe(ejs({
//       msg: 'Hello Gulp!'
//     }))
//     .pipe(gulp.dest('./dist'))
// })
