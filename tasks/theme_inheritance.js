/*
 * grunt-alloy-theme-switcher
 * https://github.com/CanalTP/grunt-alloy-theme-switcher
 *
 * Copyright (c) 2015 Vincent Degroote
 * Licensed under the AGPL license.
 */

'use strict';

module.exports = function(grunt) {

    var fs = require("fs"),
    chalk = require("chalk"),
    utils = require("../lib/utils.js"),
    existingThemes = [],
    themesTree = [];

    var _constructThemesTree = function(themeConfig){
        if (themeConfig && themeConfig.baseTheme) {
            if (existingThemes.indexOf(themeConfig.baseTheme) !== -1 && themesTree.indexOf(themeConfig.baseTheme) === -1) {
                themesTree.push(themeConfig.baseTheme);
                _constructThemesTree(utils.getThemeConfig(grunt, themeConfig.baseTheme));
            } else {
                grunt.fail.fatal(chalk.red("The baseTheme " + themeConfig.baseTheme + " provided in theme.json was not found."));
            }
        }
    };

    grunt.registerTask('extendTheme', 'Check if a theme inherits from another and if so generate the resulting theme', function() {
        existingThemes = grunt.config.get('prompt.choose_theme.options.questions')[0].choices;
        themesTree = [];
        themesTree.push(grunt.config.get('config.theme'));
        var themeConfig = utils.getThemeConfig(grunt);
        _constructThemesTree(themeConfig);
        console.log("themesTree:" + themesTree);
    });
    
};