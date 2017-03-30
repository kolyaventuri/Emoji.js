const grunt = require('grunt');
const path = require('path');
const webpackConfig = require('./webpack.config');

require("load-grunt-tasks")(grunt);
grunt.loadNpmTasks('grunt-webpack');

// Project configuration.
module.exports = (grunt) => {
  grunt.initConfig({
    'babel': {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "dist/Emoji.js": "src/Emoji.js"
        }
      }
    },
    'webpack': {
      prod: webpackConfig
    },
  });

  grunt.registerTask("default", ["babel", "webpack"]);
  grunt.registerTask("pack", ["webpack"]);
  grunt.registerTask("compile", ["babel"]);
}
