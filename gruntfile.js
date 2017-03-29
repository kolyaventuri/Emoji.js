const grunt = require('grunt');
const path = require('path');

require('google-closure-compiler').grunt(grunt);
require("load-grunt-tasks")(grunt);
grunt.loadNpmTasks('grunt-text-replace');

// Project configuration.
module.exports = (grunt) => {
  grunt.initConfig({
    'closure-compiler': {
      my_target: {
        files: {
          'dist/Emoji.min.js': ['dist/Emoji.compiled.js']
        },
        options: {
          compilation_level: 'ADVANCED',
          language_in: 'ECMASCRIPT5_STRICT',
          externs: path.join(__dirname, 'externs/externs.js'), // Don't rename the external functions
          warning_level: 'QUIET',
          create_source_map: 'dist/Emoji.min.js.map',
          output_wrapper: '(function(){%output%}).call(this);//# sourceMappingURL=output.min.js.map'
        }
      }
    },
    'babel': {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "dist/Emoji.compiled.js": "src/Emoji.js"
        }
      }
    },
    'replace': {
      standard: {
        src: ['dist/Emoji.min.js'],
        dest: 'dist/Emoji.min.js',
        replacements: [
          {
            from: /\n/g,
            to: '',
          }
        ]
      }
    }
  });

  grunt.registerTask("default", ["babel", "closure-compiler", "replace"]);
  grunt.registerTask("closure", ["closure-compiler"]);
  grunt.registerTask("compile", ["babel", "replace"]);
}
