'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadLocal = exports.download = exports.repoList = exports.tagList = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _rc = require('./rc');

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fetch = async url => {
    return new Promise((resolve, reject) => {
        let config = {
            url,
            method: 'get',
            headers: {
                'user-agent': 'xxx'
            }
        };
        (0, _request2.default)(config, (err, response, body) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(body));
        });
    });
};

let tagList = exports.tagList = async repo => {
    let config = await (0, _rc.getAll)();
    let api = `https://api.github.com/repos/${config.registry}/${repo}/tags`;
    return await fetch(api);
};
let repoList = exports.repoList = async () => {
    let config = await (0, _rc.getAll)();
    let api = `https://api.github.com/${config.type}/${config.registry}/repos`;
    return await fetch(api);
};

let download = exports.download = async (src, dest) => {
    return new Promise((resolve, reject) => {
        (0, _downloadGitRepo2.default)(src, dest, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

let downloadLocal = exports.downloadLocal = async (project, version) => {
    let conf = await (0, _rc.getAll)();
    let api = `${conf.registry}/${project}`;
    if (version) {
        api += `#${version}`;
    }
    return await download(api, _constants.DOWNLOAD + '/' + project);
};