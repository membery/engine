'use strict';

var log = require('./logging.js').getLogger('TemplateRegistry.js');
var extend = require('extend');

var DEFAULT_CFG = {
	
};

var fs = require('fs');

var TemplateRegistry = function(options) {

	var cfg = extend(true, {}, DEFAULT_CFG, options);
	var templateMap = {};
	var blockMap = {};

	this.load = function() {

		cfg.templateList.map(function(item) {
			log.info('Loading template', item);
			var content = fs.readFileSync(item, 'utf8');
			var contentObject = JSON.parse(content);

			templateMap[contentObject.templateName] = contentObject;
		});			

		cfg.blockList.map(function(item) {
			log.info('Loading block', item);
			var content = fs.readFileSync(item, 'utf8');
			var contentObject = JSON.parse(content);

			blockMap[contentObject.meta.name] = contentObject;
		})
	};
	
	this.getAllTemplates = function(req, res, next) {
		res.send(templateMap);
	}

	this.getAllBlocks = function(req, res, next) {
		res.send(blockMap);
	}

	this.load();
};

module.exports = {
	TemplateRegistry : TemplateRegistry
};
