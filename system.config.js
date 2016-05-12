(function(global) {
    var map = {
        'app': 'app',
        'rxjs': 'node_modules/rxjs',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        '@angular': 'node_modules/@angular'
    },
        packages = {
            'app': { main: 'main.js', defaultExtension: 'js' },
            'rxjs': { defaultExtension: 'js' },
            'angular2-in-memory-web-api': { defaultExtension: 'js' }
        },
        packageNames = [
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            '@angular/router-deprecated',
            '@angular/testing',
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