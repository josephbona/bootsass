module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build: {
        src: [
          'src/js/vendor/modernizr.js',
          'src/js/vendor/bootstrap/jquery.js',
          // 'src/js/vendor/bootstrap/affix.js',
          'src/js/vendor/bootstrap/transistion.js',
          // 'src/js/vendor/bootstrap/tooltip.js',
          // 'src/js/vendor/bootstrap/alert.js',
          'src/js/vendor/bootstrap/button.js',
          'src/js/vendor/bootstrap/carousel.js',
          'src/js/vendor/bootstrap/collapse.js',
          'src/js/vendor/bootstrap/dropdown.js',
          'src/js/vendor/bootstrap/modal.js',
          // 'src/js/vendor/bootstrap/popover.js',
          // 'src/js/vendor/bootstrap/scrollspy.js',
          'src/js/vendor/bootstrap/tab.js',
          'src/js/vendor/matchheights.js',
          'src/js/vendor/slick.js',
          'src/js/vendor/magnific.js',
          'src/js/map.js',
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
  autoprefixer: {
    dev: {
      src: 'css/main.css'
    }
  },
  watch: {
    scripts: {
      files: ['src/**/*.js'],
      tasks: ['default']
    }
  },
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register task(s).
  grunt.registerTask('default', ['concat:build', 'uglify:build', 'autoprefixer:dev']);

};