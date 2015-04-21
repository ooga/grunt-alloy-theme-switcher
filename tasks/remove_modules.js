/**
 * grunt-alloy-theme-switcher
 * https://github.com/CanalTP/grunt-alloy-theme-switcher
 *
 * Copyright (c) 2015 Canal TP
 * Licensed under the AGPL license.
 */

'use strict';

module.exports = function(grunt) {
    var utils = require("../lib/utils.js"),
    modulesRemoved = [],
    _ = require('underscore'),
    chalk = require("chalk");

    var removeModule = function(tiapp, moduleId, platform) {
        var modules = tiapp.getModules();
        if (_.findWhere(modules, {id:moduleId})) {
            var logMsg = 'Removing module ' + chalk.cyan(moduleId);
            if (platform) {
                tiapp.removeModule(moduleId, platform);
                logMsg += ' for platform ' + chalk.blue(platform);
            } else {
                tiapp.removeModule(moduleId);
            }
            grunt.log.ok(logMsg + '\n');
        } else {
            grunt.log.ok(chalk.yellow('Module ' + moduleId + ' was not found in tiapp.xml. Skipping.'));
        }
    };

    grunt.registerTask('remove_modules', 'Remove modules specified in theme.json', function() {
        var themeConfig = utils.getThemeConfig(grunt);
        if (themeConfig && themeConfig.modulesToRemove && themeConfig.modulesToRemove.length > 0) {
            var tiapp = require('tiapp.xml').load('./tiapp.xml');
            themeConfig.modulesToRemove.forEach(function(moduleProps) {
                if (moduleProps.platform && moduleProps.platform.length > 0) {
                    moduleProps.platform.forEach(function(platform){
                        removeModule(tiapp, moduleProps.id, platform);
                    });
                } else {
                    removeModule(tiapp, moduleProps.id);
                }
                modulesRemoved.push(moduleProps.id);
            });
            if (modulesRemoved.length > 0) {
                tiapp.setProperty('modulesRemoved', JSON.stringify(modulesRemoved));
                grunt.log.ok(chalk.green.bold('Property with removed modules added to tiapp.xml'));
                tiapp.write();
            }
        } else {
            grunt.log.ok("No modules to remove. Skipping.");
        }
    });
};