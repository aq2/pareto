// this is my gulpfile
// there are many like it, but this one is mine
// ver 0.0.2 - 11/10
// no nunchucks -> no build -> no del
// includes d3 v4

// base paths
const srcDir = 'src'

// gulp dependencies
const gulp = require('gulp'),
      // del = require('del'),
      // concat = require('gulp-concat'),
      notify = require('gulp-notify'),
      stylus = require('gulp-stylus'),
      plumber = require('gulp-plumber'),
      browserSync = require('browser-sync').create()



// Custom Plumber function for catching errors
function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || 'Gulp Error',
      message: 'Error: <%= error.message %>'
    })
  })
}


// -------- my tasks of goodness ------------

// use this for d3
gulp.task('d3', () => {
  gulp.src('node_modules/d3/build/d3.min.js')
      .pipe(gulp.dest(srcDir + '/js'))
})

// process stylus files
gulp.task('stylus', () => {
  return ( 
    gulp.src(srcDir + '/stylus/**/*.styl')
        .pipe(customPlumber('Stylus Error'))
        .pipe(stylus({ compress: true }))
        .pipe(gulp.dest(srcDir))
        // .pipe( gulp.dest(buildDir) )
        .pipe(browserSync.stream())
  )
})

// simply watch and move my hand-written js
gulp.task('js', () => {
  return ( 
    gulp.src(srcDir +'/js/**/*.js')
        // .pipe(babel({ presets: ['es2015'] }))
        // .pipe(gulp.dest(buildDir + '/js'))
        .pipe(browserSync.reload({ stream: true }))
  )
})


// simply watch and move all html templates
gulp.task('html', () => {
  gulp.src(srcDir + '/**/*.html')
      // .pipe(gulp.dest(buildDir))
      .pipe(browserSync.reload({ stream: true }))
})


// setup browser-sync - 'my' original 
gulp.task('browser-sync', () => {
  browserSync.init({
    server: { baseDir: srcDir },
    open: false
  })
})


// build all files
gulp.task('build', () => {
  gulp.start(['stylus', 'js', 'html', 'd3'])
})
 

// cleans out buildDir - not sure when best to use
// gulp.task('clean', () => {
//   return del(
//     [buildDir + '/**', '!'+ buildDir], 
//     {force:true}
//   )
// })


// everyday dev-mode task - watch css,js,html in /src, process to /build
gulp.task('dev', () => {
  gulp.start(['build', 'browser-sync'])  
  gulp.watch([srcDir + '/stylus/**/*.styl'], ['stylus'])
  gulp.watch([srcDir + '/js/**/*.js'], ['js'])
  gulp.watch([srcDir + '/**/*.html'], ['html'])
})


// useful plugins for da future
// gulp-strip-debug -> removes all console/debug
// gulp-load-plugins -> no need for multi requires
// gulp-util includes chalk - colored console messages
// exorcist -> external source maps
// gulp-rsync -? deploy to server
// nunjucks-render -> nucjucks templating engine?

