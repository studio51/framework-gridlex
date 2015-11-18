module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        dot: true
      },

      dist: {
        src: ['dist/']
      }
    },

    sass: {
      options: {
        sourceMap: true
      },

      dist: {
        files: {
          'dist/css/gridle.css': 'sass/gridle.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 5 versions', '> 15%', 'IE 10']
          }).postcss
        ]
      },

      dist: {
        src: ['dist/css/gridle.css']
      }
    },

    cssnext: {
      options: {
        sourcemap: false
      },

      dist: {
        files: {
          'dist/css/gridle.css': 'dist/css/gridle.css'
        }
      }
    },

    cssbeautifier : {
      files : ['dist/css/gridle.css'],
      options : {
        indent: '  ',
        openbrace: 'end-of-line',
        autosemicolon: true
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },

      target: {
        files: {
          'dist/css/gridle.min.css': ['dist/css/gridle.css']
        }
      }
    }
  });

  // Compiles the GridleCSS.css files from source
  //
  grunt.registerTask('compile', [
    'sass',
    'postcss',
    'cssnext'
  ]);

  // Prettifies the css files and creates a minified version
  //
  grunt.registerTask('prettify', [
    'cssbeautifier',
    'cssmin'
  ]);

  grunt.registerTask('default', ['clean', 'compile']);
  grunt.registerTask('ship', ['clean', 'compile', 'prettify']);
}
