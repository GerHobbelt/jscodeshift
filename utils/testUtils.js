/*
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const temp = require('temp').track();

function createTempFileWith(content, filename) {
  const dir = temp.mkdirSync();
  const filePath = path.join(dir, filename || 'index.js');
  mkdirp.sync(path.dirname(filePath));
  const fd = fs.openSync(filePath, 'w');
  fs.writeSync(fd, content);
  fs.closeSync(fd);
  return filePath;
}
exports.createTempFileWith = createTempFileWith;

function createTransformWith(content, fileName) {
  return createTempFileWith(
    'module.exports = function(fileInfo, api, options) { ' + content + ' }',
    fileName
  );
}
exports.createTransformWith = createTransformWith;

function getFileContent(filePath) {
  return fs.readFileSync(filePath).toString();
}
exports.getFileContent = getFileContent;
