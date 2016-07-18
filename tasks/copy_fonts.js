/*
 * grunt-alloy-theme-switcher
 * https://github.com/CanalTP/grunt-alloy-theme-switcher
 *
 * Copyright (c) 2015 Canal TP
 * Licensed under the AGPL license.
 */

'use strict';

module.exports = function(grunt) {
    var fs = require('fs');
    var fsExtra = require('fs-extra');

    grunt.registerTask('copy_fonts', 'If custom font files are found, copy them', function() {
        var fontsPath = grunt.option('themes_folder') + grunt.option('theme') + '/fonts/';
        var fontsAppPaths = ['./app/assets/android/fonts/', './app/assets/iphone/fonts/'];
        var fontsMappingAppPath = './app/lib/ctpFonts/';

        fontsAppPaths.forEach(function(fontsAppPath) {
            fsExtra.copySync(fontsPath, fontsAppPath, {filter: /.*\.ttf$/});
        });
        fsExtra.copySync(fontsPath, fontsMappingAppPath, {filter: /.*\.js$/});
    });
};
