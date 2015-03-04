# grunt-alloy-theme-switcher

> A grunt plugin to make easier theme switching in a titanium's alloy project. 

## why?

This grunt plugin was made to fix 2 problems when using alloy's themes system:
- tiapp.xml files could not be themed and we had to manually edit tiapps when building themes (including android manifest and google maps api key which is lost inside the manifest)
- i18n/*/strings.xml could not be redefined by themes

## what this plugin does

- update app/config.json to select chosen theme
- update tiapp.xml based on theme.json configuration
- merge theme's strings.xml into app

## Warning
When running this plugin, tiapp.xml and i18n files will be overwritten so *be sure to keep a backup* of those files before running it.

## Getting Started
This plugin requires Grunt `~0.4.5`

```shell
npm install grunt-alloy-theme-switcher --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-alloy-theme-switcher');
```

## The "theme.json" configuration file

You have to put a theme.json inside the root folder of your theme. 

### Example
Here is a complete example of what you can put inside this file:
```js
{
    "settings": {
        "name": "mySuperApp",
        "version": "0.0.1",
        "id": "com.mycompany.myapp"
    },
    "android":{
        "versionCode":"14",
        "MAPS_V2_API_KEY": "myincomprehensiblegmapstoken"
    }
}
```

### Details
#### settings
You can currently put any top level tiapp.xml node in the settings object, so *publisher*, *copyright*, *icon* etc
#### android (optional)
This part is used to generate the android's manifest. You *MUST* have a manifest inside you app's for this feature to work. If no manifest is found, it will raise an error. Both versionCode and MAPS_V2_API_KEY are optionnals.

## The "alloy_theme_switcher" task

### Overview
This is the main task. It will parse your themes directory and ask you to what theme you'd like to switch.

### Options

#### options.themes_folder
Type: `String`
Default value: `./app/themes/`

Location of the alloy's themes folder (with a trailing slash).

### Arguments

#### theme
Type: `String`
Default value: none

You can provide a theme to build as follows:
```js
grunt.task.run('alloy_theme_switcher:' + theme);
```

### Usage Examples

#### Default Options

##  Thanks

* [Tony Luka Savage](http://github.com/tonylukasavage) for the tiapp.xml
* [Fokke Zandbergen](http://github.com/fokkeZB) for the ti-i18n
* [Jason Kneen](https://github.com/jasonkneen) for tich and tith which inspired the tiapp.xml settings part and the theme select task

## Release History
_(Nothing yet)_
