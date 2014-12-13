module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dev: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          "public/css/style.css": "public/css/style.less"
        }
      }
      // production: {
      //   options: {
      //     paths: ["assets/css"],
      //     cleancss: true,
      //     modifyVars: {
      //       imgPath: '"http://mycdn.com/path/to/images"',
      //       bgColor: 'red'
      //     }
      //   },
      //   files: {
      //     "path/to/result.css": "path/to/source.less"
      //   }
      // }
    }
  });
  // Load the plugin that provides the "less" task.
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['less:dev']);
};