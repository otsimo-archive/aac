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
    js: path.join(cfg.paths.src.root, 'app', 'js'),
    img: path.join(cfg.paths.src.root, 'app', 'img', '**', '*'),
    symbols: path.join(cfg.paths.src.root, 'app', 'symbols', '**', '*.svg'),
    data: path.join(cfg.paths.src.root, 'app', 'data', '**', '*.json'),
    json: path.join(cfg.paths.src.root, 'app', '*.json'),
    html: path.join(cfg.paths.src.root, 'app', "index.html")
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
