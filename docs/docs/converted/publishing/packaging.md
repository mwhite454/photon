---
ai_summary: 1. create a github repo named makerjs-DRAWING
category: General
description: 1. create a github repo named makerjs-DRAWING
difficulty: intermediate
keywords:
- browserify
- drawing
- export
- general
- install
- javascript
- paths
- photon
- photon/core
- svg
layout: posts
primary_topic: npm-install-browserify
source: docs/docs/publishing/packaging.html
tags:
- intermediate
- general
- npm-install-browserify
title: npm install browserify
---
1. create a github repo named makerjs-DRAWING
a. initialize with a README
b. Add .gitignore: Node
c. License
2. copy the repo url
3. git clone the repo
4. cd makerjs-DRAWING
5. npm init
6. copy-paste the github description
test command: node test.js
7. makerjs keyword
8. npm install --save makerjs
9. add .gitignore file, add node\_modules
add test.js, with console.log('success')
npm test
10. add index.js
11. import { exporter, paths } from '@7syllable/photon-core';
function DRAWING() {
this.paths = [
new paths.Circle('circle1', [0, 0], 7)
];
}
module.exports = DRAWING;
edit test.js
import { exporter, paths } from '@7syllable/photon-core';
const DRAWING = require('./index.js');
console.log(exporter.toSVG(new DRAWING()));
npm test
\* git add .gitignore, package.json, index.js, test.js
git commit -m "initial checkin"
git push
npm publish

## npm install browserify

## tutorial for browserifying requires

scenarios
