'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-inline');

    // Project configuration.
    grunt.initConfig({

        inline: {
            dist: {
                options: {
                    // uglify: true
                    cssmin: true
                },
                src: '*.html',
                dest: ''
            }
        },
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('test', ['inline']);
    // By default, run all tests
    grunt.registerTask('default', ['test']);
};