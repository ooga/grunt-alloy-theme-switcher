# grunt-alloy-theme-switcher

> A grunt plugin to make easier theme switching AND make possible themes inheritance in a titanium's alloy project. 

## Reasons

This grunt plugin was made to fix 2 problems when using [alloy's themes system](http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Styles_and_Themes-section-35621526_AlloyStylesandThemes-Themes):
- tiapp.xml files could not be themed and we had to manually edit tiapps when building themes (including android manifest and google maps api key which is lost inside the manifest)
- i18n/*/strings.xml could not be redefined by themes
- if 2 themes (or more) had files in common, we were obliged to manually copy those files

## what this plugin does

1. if the chosen theme inherits from another, it creates a tmp theme to merge files from the different themes (furher reading below)
2. update tiapp.xml based on theme.json configuration
3. merge theme's strings.xml into app

## Warning
When running this plugin, tiapp.xml and i18n files will be overwritten so *be sure to keep a backup* of those files before running it.
If you project is under git, you can add this task to your Gruntfile just to clean everything whenever you want:

```js
grunt.initConfig({
    shell: {
        multiple: {
            command: [
                'git checkout tiapp.xml i18n/* app/config.json',
                'rm -rf app/themes/mergedTheme'
            ].join('&&')
        }
    }
});
grunt.registerTask('clean', ['shell']);
```

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
    "baseTheme":"noOptionalWidgets",
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
#### baseTheme
Themes can inherit from one another, read [Themes inheritance](#themes-inheritance) part for more details.
#### settings
You can currently put any top level tiapp.xml node in the settings object, so *publisher*, *copyright*, *icon* etc
#### android (optional)
This part is used to generate the android's manifest. You *MUST* have a manifest inside you app's for this feature to work. If no manifest is found, it will raise an error. Both versionCode and MAPS_V2_API_KEY are optionnals.

## Themes inheritance
### what's the purpose?
Imagine you have to themes sharing a view (needed to remove a widget for instance).
With theme inheritance you can create a theme containing this view and make the two other themes inherit this newly created theme. So those two child themes will be only variations (concerning assets for instance) of the parent theme.

### how it works?
When choosing a theme, this plugin will look for a baseTheme property inside the theme.json file. If one is found and exist, it will create a temp directory called "mergedTheme" to put the content of the resulting merge of those two themes. The directories views, styles and i18n will just be copied recursively, and the theme.json files merged.

### Remark
This inheritance is recursive and can have n levels but a theme *MUST* be used at only one level of a hierarchy.
After that, the mergedTheme folder will be used to generate the tiapp and merge i18n xml files.

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
```shell
grunt alloy_theme_switcher:mySuperTheme
```

### Usage Examples
In your Gruntfile:

```js
grunt.loadNpmTasks('grunt-alloy-theme-switcher');
grunt.registerTask('default', 'alloy_theme_switcher');
```

And then in shell
```shell
grunt
```

### TODO
- add titanium build
- find a way to leave untouched tiapp.xml, app/config.json and i18n folder
- find a way to do the merge without creating a new folder

##  Thanks

* [Tony Luka Savage](http://github.com/tonylukasavage) for the tiapp.xml
* [Fokke Zandbergen](http://github.com/fokkeZB) for the ti-i18n
* [Jason Kneen](https://github.com/jasonkneen) for tich and tith which inspired the tiapp.xml settings part and the theme select task

## Release History
- 0.1.0 initial version. Tiapp.xml settings plus i18n files merge.
- 0.2.0 Added the inheritance of themes.
