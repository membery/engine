// Configuration for the protractor
var config = require('./protractor.conf');

config.suites = {
	schema: '../e2e/specs/schema.js',
	rememberMe: '../e2e/specs/rememberMe.js',
	language: '../e2e/specs/language.js'
};

if (process.env.TRAVIS) {
	config.capabilities.name = "[" + process.env.TRAVIS_REPO_SLUG + "#" + process.env.TRAVIS_BRANCH + "] [e2e] Build " + process.env.TRAVIS_BUILD_NUMBER
}

module.exports = config;
