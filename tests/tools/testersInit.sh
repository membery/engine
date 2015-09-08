#!/usr/bin/env node
console.log('hello world this is init script which creates user for testin (with all premisssions and passwd johndoe)');
var databaseInit = require('./init-mongo_test.js');
databaseInit.beforeProtractorLaunch();
console.log('done');
