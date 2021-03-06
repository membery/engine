'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend');



var config = {
	portalPort: 3001,
	portalHost: 'localhost',
	portalTemplatesPath: path.join('data', 'portal', 'templates'),
	webserverPort: process.env.REGISTRIES_HTTP_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
	webserverSecurePort: process.env.REGISTRIES_HTTPS_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3443,
	webserverHost: process.env.REGISTRIES_HTTP_IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
	webserverPublicUrl: process.env.REGISTRIES_PUBLIC_URL || process.env.OPENSHIFT_PUBLIC_URL || 'https://localhost:3443',
	mongoDbURI: (
				process.env.REGISTRIES_MONGODB_URL || process.env.OPENSHIFT_MONGODB_DB_URL ||
				'mongodb://' + (process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost') + ':' + (process.env.OPENSHIFT_MONGODB_DB_PORT || '27017')
			) + '/registry' + (process.env.NODE_ENV === 'test' ? '_test' : ''),
	mongoDbURI_test: 'mongodb://localhost:27017/integration_test_' + new Date().getTime(),
	paths: {
		photos: process.env.REGISTRIES_PATH_PHOTOS || path.join(process.cwd(), 'data', 'photos'),
		uploads: process.env.REGISTRIES_PATH_UPLOADS || path.join(process.cwd(), 'data', 'uploads'),
		schemas: process.env.REGISTRIES_PATH_SCHEMAS || path.join(process.cwd(), 'data', 'schemas'),
		portalTemplates: process.env.REGISTRIES_PATH_TEMPLATES || path.join(process.cwd(), 'data', 'portal', 'client', 'templates'),
		portalBlocks: process.env.REGISTRIES_PATH_BLOCKS || path.join(process.cwd(), 'data', 'portal', 'client', 'blocks'),
		dataset: process.env.REGISTRIES_PATH_DATASET || path.join(process.cwd(), 'data'),
		portalClient: path.join(process.cwd(), 'data', 'portal', 'client')
	},
	mails: {
		eventProcessingErrorSender: 'websupport@unionsoft.sk',
		eventProcessingError: 'websupport@unionsoft.sk',
		massmailSenderAddress: 'websupport@unionsoft.sk',
		requestNotifSender: 'websupport@unionsoft.sk',
		requestSolverAddress: 'websupport@unionsoft.sk'
	},
	schemaRegistry: {
		schemas: [ 'permissions.json', 'login.json', 'systemCredentials.json', 'people.json',
			'group.json', 'groupMaster.json', 'member.json', 'organization.json',
			'club.json', 'coach.json', 'player.json', 'referee.json', 'stadium.json', 'person.json']
	},
	logging: (function() {
		switch (process.env.NODE_ENV) {
		case 'test': return {
			cfg: {
				console: {
					level: 'warn',
					colorize: true,
					prettyPrint: true,
					timestamp: false,
					silent: true
							}
			},
			addLabel: true
		};
		case 'prod': return {
			cfg: {
				console: {
					level: 'info',
					colorize: true,
					prettyPrint: false,
					timestamp: true
				}
			},
			addLabel: true
		};
		default: return {
			cfg: {
				console: {
					level: 'silly',
					colorize: true,
					prettyPrint: true,
					timestamp: true
				}
			},
			addLabel: true
		};}
	}()),
	collation: {
		numberOfChars: 32,
		language: 'sk'
	},
	defaultRedis: {
		port: 6379,
		host: 'localhost'
	},
	cacheKeyPrefix: 'registry:'
};

// merge default configuration with local configuration if exists
var localConfigFile = (process.env.REGISTRIES_LOCAL_CONFIG || path.join(process.cwd(), 'local-config.js'));
if (fs.existsSync(localConfigFile)) {
	var localConfig = JSON.parse(fs.readFileSync(localConfigFile));

	config = extend(true, config, localConfig);
}
module.exports = config;
