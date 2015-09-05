module.exports.create = create;
module.exports.createFull = createFull;
module.exports.check = check;
module.exports.erase = deleteCollectionFromDatabase;
module.exports.eraseOne = deleteDocumentFromDatabase;
var iElement = require('./element.js');

function create(data, options){
	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).$('a.x-submenu-toggle').click();
 	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).all(by.css('ul > li')).get(data.createNo).click();
	var schema = data.schema.properties;
	for (key in schema) {
		(function (schemicka,k){			//schemicka  =  jeden block (baseData)
			for (keys in schemicka) {
				if (((options.indexOf(k)>-1)) || (schemicka[keys].hasOwnProperty('required') && (schemicka[keys].required==true))) {
					iElement.click(schemicka[keys], k, keys);
				}
			}
		})(schema[key].properties, key);
	}
	element(by.css('button.btn-ok')).click();  //confirm
	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).$('a.x-submenu-toggle').click();
}

function check(data, schemaName) {
	var schema = data.schema.properties;
	//element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).$('a.x-submenu-toggle').click();
	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).all(by.css('ul > li')).get(data.findNo).click();
	for (k in data.schema.properties) {
		for (q in data.schema.properties[k].properties) {
			if (!(data.schema.properties[k].properties[q].hasOwnProperty('sequence')) ) {
				element(by.model('crit.field')).$('option[label="'+data.schema.properties[k].properties[q].title+'"]').click();
				element(by.model('crit.val')).click();
				element(by.model('crit.val')).$('input').sendKeys(k+' '+q);
				element(by.css('button.btn-primary')).click();
				expect(element.all(by.repeater('d in data')).count()).toEqual(1+(data.dependencies.indexOf(schemaName) > -1 ? 1 : 0));
				element(by.repeater('a in $parent.schema.clientActions')).click();
				//expect($('.x-form div[class="x-form-title"]').getText()).toEqual(data.schema.title); //TODO
				for (key in schema) {
					(function (schemicka, k){			//schemicka  =  jeden block (baseData)
						for (keys in schemicka) {
							iElement.check(schemicka[keys], k, keys);
						}
					})(schema[key].properties, key);
				}
				break;}
			}
		break;}
	/*element(by.css('button.btn-primary')).click();
	if (data.schema.table == 'people') {
		expect(element.all(by.repeater('d in data')).count()).toEqual(1);
		element(by.repeater('a in $parent.schema.clientActions')).click();
	}
	else {
		expect(element.all(by.repeater('d in data')).count()).toEqual(3);
		element.all(by.repeater('a in $parent.schema.clientActions')).get(3).click();
	}
	expect($('.x-form div[class="x-form-title"]').getText()).toEqual(data.schema.title);
	for (key in schema) {
		(function (schemicka, k){			//schemicka= jeden block (baseData)
			for (keys in schemicka) {
				iElement.check(schemicka[keys], k, keys);
			}
		})(schema[key].properties, key);
	}*/
}
function createFull(data, name){
	var uniqueName = name + new Date().getTime();
	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).$('a.x-submenu-toggle').click();
 	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).all(by.css('ul > li')).get(data.createNo).click();
	// Fill in the club
	var schema = data.schema.properties;
	for (key in schema) {
		(function (schemicka,k){			//schemicka  =  jeden block (baseData)
			for (keys in schemicka) {
				iElement.click(schemicka[keys], k, keys);
			}
		})(schema[key].properties, key);
	}
	element(by.css('button.btn-ok')).click();  //confirm
}

function deleteCollectionFromDatabase(collectionName){
	var serverConfig = require('./../../../../build/server/config.js');
	var ObjectID = require("mongodb").ObjectID;
	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect(serverConfig.mongoDbURI, function(err, db) {
    	db.collection(collectionName, {}, function(err, document) {
        	document.remove({}, function(err, result) {
            	if (err) {
           			console.log('Mongo: '+err);
 				}
          		console.log('All: removed '+result+' documents from collection '+collectionName);
        		db.close();
        	});
    	});
	});
}

function deleteDocumentFromDatabase(collectionName, querry){
	var serverConfig = require('./../../../../build/server/config.js');
	var ObjectID = require("mongodb").ObjectID;
	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect(serverConfig.mongoDbURI, function(err, db) {
    	db.collection(collectionName, {}, function(err, document) {
        	document.remove(querry, function(err, result) {
            	if (err) {
           			console.log('Mongo: '+err);
 				}
          		console.log('One: removed '+result+' documents from collection '+collectionName);
        		db.close();
        	});
    	});
	});
}
