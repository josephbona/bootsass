module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
    	build: {
    		options: {
    			outputStyle: 'compressed'
    		},
    		files: {
    			'css/main.css' : 'src/scss/main.scss'
    		},
    	},
    },
    concat: {
    	build: {
    		src: [
    			'src/js/vendor/modernizr.js',
    			'src/js/vendor/bootstrap/jquery.js',
    			'src/js/vendor/bootstrap/affix.js',
    			'src/js/vendor/bootstrap/transistion.js',
    			'src/js/vendor/bootstrap/tooltip.js',
    			'src/js/vendor/bootstrap/alert.js',
    			'src/js/vendor/bootstrap/button.js',
    			'src/js/vendor/bootstrap/carousel.js',
    			'src/js/vendor/bootstrap/collapse.js',
    			'src/js/vendor/bootstrap/dropdown.js',
    			'src/js/vendor/bootstrap/modal.js',
    			'src/js/vendor/bootstrap/popover.js',
    			'src/js/vendor/bootstrap/scrollspy.js',
    			'src/js/vendor/bootstrap/tab.js',
    			'src/js/vendor/*.js',
    			'src/js/main.js',
    		],
    		dest: 'js/script.js',
    	},
    },
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
			files: {
				'js/script.min.js': ['js/script.js'],
			},
		},
	},
	watch: {
		options: {
			livereload: true,
		},
		js: {
			files: ['src/js/**/*.js'],
			tasks: ['concat:build', 'uglify:build'],
			options: { livereload: true }
		},
		css: {
			files: ['src/scss/**/*.scss'],
			tasks: ['sass:build'],
			options: { livereload: true }
		},
		pages: {
			files: ['*.html', '*.php'],
			options: { livereload: true }
		}
	}
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register task(s).
  grunt.registerTask('default', ['sass:build', 'concat:build', 'uglify:build', 'watch']);
  // grunt.registerTask('server', ['express', 'watch']);

};