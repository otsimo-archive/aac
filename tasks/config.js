"use strict";
var path = require('path');
var cfg = {
    paths: {
        src: {
            root: path.join('.')
        },
        builds: {
            root: path.join('dist', path.sep)
        }
    }
}

let globs = {
    ver: path.join(cfg.paths.src.root, 'app'),
    js: path.join(cfg.paths.src.root, 'app', 'js', '**', '*.js'),
    img: path.join(cfg.paths.src.root, 'app', 'img', '**', '*'),
    woff: path.join(cfg.paths.src.root, 'app', 'woff', '**', '*.woff'),
    woff2: path.join(cfg.paths.src.root, 'app', 'woff', '**', '*.woff2'),
    font: path.join(cfg.paths.src.root, 'app', 'font'),
    symbols: path.join(cfg.paths.src.root, 'app', 'symbols', '*.svg'),
    symbols_tr: path.join(cfg.paths.src.root, 'app', 'symbols', 'tr', '*.svg'),
    symbols_en: path.join(cfg.paths.src.root, 'app', 'symbols', 'en', '*.svg'),
    data: path.join(cfg.paths.src.root, 'app', 'data', '**', '*.json'),
    json: path.join(cfg.paths.src.root, 'app', '*.json'),
    css: path.join(cfg.paths.src.root, 'app', 'css',  '*.css'),
    html: path.join(cfg.paths.src.root, 'app', "index.html"),
    template: path.join(cfg.paths.src.root, 'app', 'template', "*.html"),
    i18n: path.join(cfg.paths.src.root, 'i18n', '**', '*'),
};

Object.keys(globs).forEach(type => cfg.paths.src[type] = globs[type]);

['dev', 'prod', 'tmp'].forEach(function (build) {
    let builds = cfg.paths.builds;
    builds[build] = {};
    builds[build].root = path.join(builds.root, build, path.sep);
});

Object.keys(cfg.paths.builds).forEach(function (buildType) {
    let buildSubDir = cfg.paths.builds[buildType];
    if (typeof buildSubDir !== 'string') {
        Object.keys(globs).forEach(type => buildSubDir[type] = path.join(buildSubDir.root, type, path.sep));
    }
});

module.exports = cfg;
