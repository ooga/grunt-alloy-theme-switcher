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
    _ = require("underscore");

    var _findAndroidNodeByAttribute = function(node){
        return node.hasAttribute('android:name') && node.getAttribute('android:name').indexOf(this.attributeName) !== -1;
    };

    var _updateManifest = function(tiapp, config) {
        if (config.android) {
            var manifests = tiapp.doc.getElementsByTagName('manifest');
            if (manifests.length !== 1) {
                console.log(chalk.red("No manifest tag found in your tiapp.xml."));
                return false;
            } else {
                var manifest = manifests[0];
                // update versionCode
                if (config.android.versionCode) {
                    manifest.setAttribute('android:versionCode', config.android.versionCode);
                    manifest.setAttribute('android:versionName', tiapp.version);
                    console.log(chalk.green('\nandroid:version Code and versionName updated'));
                }
                if (config.android.MAPS_V2_API_KEY) {
                    // update gmaps api key
                    var metaDatas = manifest.getElementsByTagName('meta-data');
                    var metaData = _.find(metaDatas, _findAndroidNodeByAttribute, {attributeName: "com.google.android.maps.v2.API_KEY"});
                    if (metaData) {
                        metaData.setAttribute('android:value', config.android.MAPS_V2_API_KEY);
                        console.log(chalk.green('\ncom.google.android.maps.v2.API_KEY updated'));
                    }
                    // update app id in permission MAPS_RECEIVE
                    var permissions = manifest.getElementsByTagName('permission');
                    var permission = _.find(permissions, _findAndroidNodeByAttribute, {attributeName: ".permission.MAPS_RECEIVE"});
                    if (permission) {
                        permission.setAttribute('android:name', tiapp.id + '.permission.MAPS_RECEIVE');
                        console.log(chalk.green('\npermission .permission.MAPS_RECEIVE updated'));
                    }
                    // update app id in uses-permission MAPS_RECEIVE
                    var uses_permissions = manifest.getElementsByTagName('uses-permission');
                    var uses_permission = _.find(uses_permissions, _findAndroidNodeByAttribute, {attributeName: ".permission.MAPS_RECEIVE"});
                    if (uses_permission) {
                        uses_permission.setAttribute('android:name', tiapp.id + '.permission.MAPS_RECEIVE');
                        console.log(chalk.green('\nuses-permission .permission.MAPS_RECEIVE updated'));
                    }
                }
                console.log(chalk.green('\nAndroid manifest generated'));
                return true;
            }
        } else {
            grunt.log.error(chalk.red("No android configuration found for " + config.name + " or some parameters are missing (MAPS_V2_API_KEY, versionCode)"));
            return false;
        }
    };

    grunt.registerTask('update_tiapp', 'Update the tiapp xml according to theme config', function(theme_name) {
        // read theme's config
        var themeJsonPath = grunt.option('themes_folder') + theme_name + '/theme.json';
        if (fs.statSync(themeJsonPath).isFile() !== true) {
            grunt.log.error(chalk.red("No configuration file found at " + themeJsonPath));
        } else {
            var themeConfig = JSON.parse(fs.readFileSync(themeJsonPath, "utf-8"));
            // load tiapp
            var tiapp = require('tiapp.xml').load('./tiapp.xml');
            for (var setting in themeConfig.settings) {
                if (setting !== "properties") {
                    tiapp[setting] = themeConfig.settings[setting];
                    console.log('Changing ' + chalk.cyan(setting) + ' to ' + chalk.yellow(themeConfig.settings[setting]));
                }
            }
            if (_updateManifest(tiapp, themeConfig)) {
                tiapp.write();
                console.log(chalk.green('\nTiApp.xml updated\n'));
            } else {
                grunt.fail.fatal(chalk.red("TiApp.xml not updated."));
            }
        }
    });
};