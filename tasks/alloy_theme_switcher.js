/*
 * grunt-alloy-theme-switcher
 * https://github.com/CanalTP/grunt-alloy-theme-switcher
 *
 * Copyright (c) 2015 Canal TP
 * Licensed under the AGPL license.
 */

'use strict';

module.exports = function(grunt) {
    var fs = require("fs");

    grunt.registerTask('alloy_theme_switcher', 'A grunt plugin to ease theme switching in titanium\'s alloy.', function() {
        grunt.option('themes_folder', this.options.themes_folder ? this.options.themes_folder : './app/themes/');
        grunt.config.merge({
            prompt: {
                choose_theme: {
                    options: {
                        questions: [
                            {
                                config: 'config.theme',
                                type: 'list',
                                message: 'Please choose a theme : ',
                                choices: fs.readdirSync(grunt.option('themes_folder')).filter(function(file) {
                                    return fs.statSync(grunt.option('themes_folder')+'/'+file).isDirectory();
                                })
                            }
                        ],
                        then: function(){
                            grunt.option("theme", grunt.config.get('config.theme'));
                            grunt.task.run('alloy_theme_switcher');
                        }
                    }
                }
            }
        });
        var theme = grunt.option("theme");
        if (theme && fs.existsSync(grunt.option('themes_folder') + theme)) {
            grunt.task.run('extendTheme');
            grunt.task.run('update_tiapp');
            grunt.task.run('remove_modules');
            grunt.task.run('merge_i18n');
        } else {
            if (fs.existsSync(grunt.option('themes_folder')) === false || fs.statSync(grunt.option('themes_folder')).isDirectory() === false) {
                grunt.fail.fatal("No themes folder found in " + grunt.option('themes_folder'));
            }
            grunt.loadNpmTasks('grunt-prompt');
            grunt.task.run('prompt:choose_theme');
        }

    });
};