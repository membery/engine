var q = require('q'),
	async = require('async');

//var mongoDriver = require('./../../build/server/mongoDriver.js'),serverConfig = require('./../../build/server/config.js');
var mongoInit = require('./../tools/init-mongo_test.js');
// Configuration for the protractor
var config = {

	baseUrl: 'http://localhost:3000',

	capabilities: { browserName: 'firefox' },
	/*multiCapabilities: [{browserName: 'firefox'}, {browserName: 'chrome'}],*/
	jasmineNodeOpts: {
			showColors: true, // Use colors in the command line report.
		defaultTimeoutInterval: 300000,
	},
//	framework: 'mocha',
	// Drop test database so we can run tests on clean DB (old code for creating a database for tests)
	/*beforeLaunch: function() {var deferred = q.defer(); async.series([ function initMongo(cb) {mongoDriver.init(serverConfig.mongoDbURI, cb);},function dropDatabase(cb) {mongoDriver.getDb().dropDatabase(cb);},function closeConnection(cb) {mongoDriver.close();return cb();}], function(err) {return err ? deferred.reject(err) : deferred.resolve();});return deferred.promise;}*/
	beforeLaunch: function () {
		mongoInit.beforeProtractorLaunch();
	}
};

if (process.env.TRAVIS) {
	config.sauceUser = process.env.SAUCE_USERNAME;
	config.sauceKey = process.env.SAUCE_ACCESS_KEY;
	config.capabilities['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
	config.capabilities.build = process.env.TRAVIS_BUILD_NUMBER;
}

module.exports = config;
