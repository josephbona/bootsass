var gulp = require('gulp'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		browserSync = require('browser-sync').create(),
		bowerDir = './bower_components',
		config = {
			input: {
				scss: './src/scss/**/*.scss',
				js: './src/js/**/*.js'
			},
			output: {
				scss: './public/css',
				js: './public/js'
			},
			sassOptions: {
			  errLogToConsole: true,
			  outputStyle: 'compressed',
			  includePaths: [
			    bowerDir + '/bootstrap-sass/assets/stylesheets',
			    bowerDir + '/font-awesome/scss'
			  ]
			},
			autoprefixerOptions: {
			  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
			},
			scripts: [
				'src/js/vendor/modernizr.js',
        bowerDir + '/jquery/dist/jquery.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/affix.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/transistion.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/tooltip.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/alert.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/button.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/carousel.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/collapse.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/dropdown.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/modal.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/popover.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/scrollspy.js',
        bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap/bootstrap/tab.js',
        'src/js/main.js',
			]
		};

gulp.task('font-awesome', function() { 
  return gulp.src(bowerDir + '/font-awesome/fonts/**.*') 
    .pipe(gulp.dest('./public/fonts')); 
});
gulp.task('glyphicons', function() { 
  return gulp.src(bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*') 
    .pipe(gulp.dest('./public/fonts/bootstrap')); 
});

gulp.task('serve', function () {
  browserSync.init({
      server: './public'
  });
});

gulp.task('sass', function () {
  return gulp
    .src(config.input.scss)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.output.scss))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
	return gulp.src(config.scripts)
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(gulp.dest(config.output.js))
		.pipe(rename('script.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.output.js));
});
gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('default', ['font-awesome', 'glyphicons', 'sass', 'js-watch', 'serve'], function() {
	gulp.watch([config.input.scss, bowerDir + '/**/*.scss'], ['sass']);
	gulp.watch([config.input.js, bowerDir + '/**/*.js'], ['js-watch']);
	gulp.watch('./public/*.html').on('change', browserSync.reload);
	gulp.watch('*.php').on('change', browserSync.reload);
});