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
    utils = require("../lib/utils.js"),
    chalk = require("chalk");

    grunt.registerTask('select_theme', 'Update the app/config.json with theme name provided as argument', function(theme_name) {
        //select theme in config.json
        var alloyCfg = utils.parseJSON("./app/config.json");
        alloyCfg.global.theme = theme_name;
        console.log(chalk.green('\nUpdated Theme to ' + alloyCfg.global.theme));
        fs.writeFileSync("./app/config.json", JSON.stringify(alloyCfg, null,4));
    });
};