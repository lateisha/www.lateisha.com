var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var cjsx = require('gulp-cjsx');
var concat = require('gulp-concat');
var csscomb = require('gulp-csscomb');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gzip = require('gulp-gzip');
var jade = require('gulp-jade');
var merge = require('merge-stream');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var path = require('path');
var tar = require('gulp-tar');
var uglify = require('gulp-uglify');

var pjson = require('./package.json');

if (process.env.NODE_ENV != 'development' &&
  process.env.NODE_ENV !== undefined) {
  gulp.task('default');
  return;
}

var bowerDir = './bower_components';

gulp.task('default', [
  'bower',
  'css',
  'fonts',
  'images',
  'jade',
  'js',
  'readme',
  'vendorjs',
  'watch'
]);

gulp.task('bower', function() {
  return bower()
    .on('error', gutil.log)
    .pipe(gulp.dest(bowerDir));
});

gulp.task('build', function() {
  gulp.src('./public/**/*')
    .pipe(tar('v' + pjson.version + '.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('./public')); 
});


gulp.task('vendorjs', function() {
  var vendorFiles = [
    //bowerDir + '/react/react-with-addons.min.js',
    bowerDir + '/jquery/dist/jquery.min.js',
    bowerDir + '/bootstrap/dist/js/bootstrap.min.js',
  ];

  var vendorMaps = [
    bowerDir + '/jquery/dist/jquery.min.map',
  ];

  gulp.src(vendorFiles)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./public/js/'));

  gulp.src(vendorMaps)
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('images', function() {
  gulp.src('./images/**/*')
    .pipe(gulp.dest('./public/images/'));
});

gulp.task('fonts', function() {
  var vendorFiles = [
    bowerDir + '/font-awesome/fonts/fontawesome-webfont.eot',
    bowerDir + '/font-awesome/fonts/fontawesome-webfont.svg',
    bowerDir + '/font-awesome/fonts/fontawesome-webfont.ttf',
    bowerDir + '/font-awesome/fonts/fontawesome-webfont.woff',
    bowerDir + '/font-awesome/fonts/fontawesome-webfont.woff2',
  ];

  gulp.src(vendorFiles)
    .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('css', function() {
  var vendorFiles = [
    bowerDir + '/font-awesome/css/font-awesome.min.css',
  ];

  var options = {
    includePaths: [
      bowerDir + '/bourbon/app/assets/stylesheets',
      bowerDir + '/bootstrap/scss'
    ],
    outputStyle: 'compressed'
  };

  var browsers = [
    'Android 2.3',                                                           
    'Android >= 4',                                                          
    'Chrome >= 35',                                                          
    'Firefox >= 31',                                                         
    'Explorer >= 9',                                                         
    'iOS >= 7',                                                              
    'Opera >= 12',                                                           
    'Safari >= 7.1'                                                          
  ];

  var vendorStream = gulp.src(vendorFiles);
  var appStream = gulp.src('./src/scss/core.scss')
    .pipe(sass(options).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: browsers }))
    .pipe(csscomb(bowerDir + '/bootstrap/scss/.csscomb.json'));

  merge(vendorStream, appStream)
    .pipe(concat('application.min.css'))
    //.pipe(minifyCss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function() {
  options = {
    pretty: false
  };

  gulp.src('./src/jade/**/*.jade')
    .pipe(jade(options))
    .on('error', gutil.log)
    .pipe(gulp.dest('./public/'));
});

gulp.task('js', function() {
  gulp.src('./src/coffee/**/*.coffee')
    .pipe(cjsx({ bare: true }))
    .on('error', gutil.log)
    .pipe(concat('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('readme', function() {
  gulp.src('./README.md')
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/coffee/**/*.coffee', ['js']);
  gulp.watch('./src/jade/**/*.jade', ['jade']);
  gulp.watch('./src/scss/**/*.scss', ['css']);
  gulp.watch('./images/**/*', ['images']);
  gulp.watch('./README.md', ['readme']);
});
