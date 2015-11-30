// Configuration for the protractor
var config = require('./e2e.conf');

config.capabilities.browserName = 'internet explorer';
config.capabilities.name += " - internet explorer";

exports.config = config;
