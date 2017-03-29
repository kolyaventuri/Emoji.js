const grunt = require('grunt');

require('google-closure-compiler').grunt(grunt);
require("load-grunt-tasks")(grunt);

// Project configuration.
module.exports = (grunt) => {
  grunt.initConfig({
    'closure-compiler': {
      my_target: {
        files: {
          'dist/Emoji.min.js': ['dist/Emoji.compiled.js']
        },
        options: {
          compilation_level: 'SIMPLE',
          language_in: 'ECMASCRIPT5_STRICT',
          create_source_map: 'dest/Emoji.min.js.map',
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
    }
  });

  grunt.registerTask("default", ["babel", "closure-compiler"]);
}
