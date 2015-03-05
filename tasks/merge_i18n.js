/*
 * grunt-alloy-theme-switcher
 * https://github.com/CanalTP/grunt-alloy-theme-switcher
 *
 * Copyright (c) 2015 Vincent Degroote
 * Licensed under the AGPL license.
 */

'use strict';

module.exports = function(grunt) {
    var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    i18n = require('ti-i18n'),  
    chalk = require("chalk");

    grunt.registerTask('merge_i18n', 'If i18n files are found, merge into app i18n xmls', function() {
        var i18nThemePath = grunt.option('themes_folder') + grunt.config.get('config.theme') + '/i18n/';
        var i18nAppPath = './i18n/';
        if (fs.existsSync(i18nThemePath) && fs.existsSync(i18nAppPath)) {
            // get app xml languages folders and keep only languages existing in theme
            var languagesDirectories = fs.readdirSync(i18nAppPath).filter(function(file) {
                return fs.existsSync(i18nThemePath+file) && fs.statSync(i18nThemePath+file).isDirectory();
            });
            languagesDirectories.forEach(function(languageDir){
                fs.readdirSync(i18nThemePath + languageDir).forEach(function(file){
                    var filePath = i18nThemePath + languageDir + '/' + file;
                    if (fs.statSync(filePath).isFile() && path.extname(file) === '.xml') {
                        i18n.merge({
                            apply: true,
                            source: filePath,
                            language: languageDir
                        });
                    }
                });
            });
        } else {
            console.log(chalk.cyan.underline('no i18n files found in theme (or in app).\n'));
        }
    });
};