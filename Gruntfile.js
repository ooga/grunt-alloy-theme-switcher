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

    // By default, lint and run all tests.
    grunt.registerTask('default', 'default task to prepare an application with the given theme', function(theme){
        var options = this.options({
            themes_folder: './app/themes/'
        });
        grunt.option('themes_folder', options.themes_folder);
        // console.log('is directory?' + fs.existsSync(grunt.option('themes_folder') + theme));

        if (theme && fs.existsSync(grunt.option('themes_folder') + theme)) {
            grunt.task.run('select_theme:' + theme);
            grunt.task.run('update_tiapp:' + theme);
            grunt.task.run('merge_i18n:' + theme);
        } else {
            if (fs.existsSync(grunt.option('themes_folder')) === false || fs.statSync(grunt.option('themes_folder')).isDirectory() === false) {
                grunt.fail.fatal("No themes folder found in " + grunt.option('themes_folder'));
            }
            var themes = fs.readdirSync(grunt.option('themes_folder')).filter(function(file) {
                return fs.statSync(grunt.option('themes_folder')+'/'+file).isDirectory();
            });
            grunt.task.run('prompt:choose_theme');
        }
    });

};
