/*
 * grunt-alloy-theme-switcher
 * https://github.com/CanalTP/grunt-alloy-theme-switcher
 *
 * Copyright (c) 2015 Vincent Degroote
 * Licensed under the AGPL license.
 */

'use strict';

var fs = require("fs"),
chalk = require("chalk");

exports.parseJSON = function(jsonPath){
    var jsonParsed;
    if (fs.existsSync(jsonPath) === false || fs.statSync(jsonPath).isFile() === false) {
        jsonParsed = false;
        // console.log(chalk.yellow("No json file found at " + jsonPath));
    } else {
        try{
            jsonParsed = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        }catch(e){
            console.log(chalk.red("Exception raised while parsing " + jsonPath + " - Exception:" + JSON.stringify(e)));
            jsonParsed = false;
        }
    }
    return jsonParsed;
};

exports.getThemeConfig = function(grunt, themeName){
    themeName = themeName || grunt.config.get('config.theme');
    return exports.parseJSON(grunt.option('themes_folder') + themeName + '/theme.json');
};