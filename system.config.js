(function(global) {
    var map = {
            'app': 'app',
            'rxjs': 'node_modules/rxjs',
            '@angular': 'node_modules/@angular',
            'easy-forms': 'node_modules/angular2-easy-forms'
        },
        packages = {
            'app': { main: 'main.js', defaultExtension: 'js' },
            'rxjs': { defaultExtension: 'js' },
            'easy-forms': {main: 'component.js', defaultExtension: 'js'}
        },
        packageNames = [
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            '@angular/upgrade'
        ];

    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    };

    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);