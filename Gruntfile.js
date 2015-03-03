/**
 * grunt-alloy-theme-switcher
 * https://github.com/CanalTP/grunt-alloy-theme-switcher
 *
 * Copyright (c) 2015 Vincent Degroote
 * Licensed under the AGPL license.
 */

'use strict';

module.exports = function(grunt) {
    // private vars
    var fs = require("fs"),
    chalk = require('chalk');

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        alloy_theme_switcher: {
            options: {
                themes_folder: './app/themes/'
            }
        },
        prompt: {
            choose_theme: {
                options: {
                    questions: [
                        {
                            config: 'config.theme',
                            type: 'list',
                            message: 'Choisissez un thème pour la déclinaison : '
                        }
                    ],
                    then: function(){
                        grunt.task.run('default:' + grunt.config.get('config.theme'));
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-prompt');
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['jshint']);

};
