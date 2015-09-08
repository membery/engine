module.exports.create = create;
module.exports.createFull = createFull;
module.exports.check = check;
module.exports.erase = deleteCollectionFromDatabase;
module.exports.eraseOne = deleteDocumentFromDatabase;
var iElement = require('./element.js');

function create(data, options){
	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).$('a.x-submenu-toggle').click();
 	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).all(by.css('ul > li')).get(data.createNo).click();
	var schema = data.newSchema.properties;
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
	var schema = data.searchSchema.properties;
	//element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).$('a.x-submenu-toggle').click();
	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).all(by.css('ul > li')).get(data.findNo).click();
	var done = false;
	var i = 0;
	function searchMenuNavigation(reqp) {
		for (k in data.searchSchema.properties) {
			for (q in data.searchSchema.properties[k].properties) {
				var prop = data.searchSchema.properties[k].properties[q];
				var idk = (prop.hasOwnProperty('required')==reqp ? true : false); //idk == i dont know
				idk = !( prop.hasOwnProperty('sequence') || prop.hasOwnProperty('readOnly') || prop.hasOwnProperty('objectLink2') || (prop.hasOwnProperty('type') && (prop.type=='number' || prop.type=='array')) || prop.hasOwnProperty('render') || idk );
				if (idk) {
					element(by.model('crit.field')).all(by.css('option')).get(i+1).click();
					element(by.model('crit.val')).click();
					element(by.model('crit.val')).$('input').sendKeys(k+' '+q);
					element(by.css('button.btn-primary')).click();
					var confirmButton= element.all(by.repeater('a in $parent.schema.clientActions'));
					confirmButton.get(0).click();
					done=true;
					//expect($('.x-form div[class="x-form-title"]').getText()).toEqual(data.schema.title); //TODO
					for (key in schema) {
						(function (schemicka, k){			//schemicka  =  jeden block (baseData)
							for (keys in schemicka) {
								iElement.check(schemicka[keys], k, keys);
							}
						})(schema[key].properties, key);
					}
					break;
				}
				i=i+1;
			}
			if (done) {break;}
		}
	}
	searchMenuNavigation(true);
	if (!done) {i=0; searchMenuNavigation(false);}
	if (!done) {console.log('WARNING - no assertions were checked');}
}
function createFull(data, name){
	var uniqueName = name + new Date().getTime();
	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).$('a.x-submenu-toggle').click();
 	element.all(by.css('#main-menu div div > ul > li')).get(data.listNo).all(by.css('ul > li')).get(data.createNo).click();
	// Fill in the club
	var schema = data.newSchema.properties;
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

function deleteDocumentFromDatabase(schema){
	var serverConfig = require('./../../../../build/server/config.js');
	var ObjectID = require("mongodb").ObjectID;
	var MongoClient = require('mongodb').MongoClient;
	var querry;
	for (key in schema.properties) {
		for (keys in schema.properties[key].properties) {
			var prop = schema.properties[key].properties[keys]
			if (!(prop.hasOwnProperty('sequence') || prop.hasOwnProperty('objectLink2') || (prop.hasOwnProperty('type') && prop.type=='number') || prop.hasOwnProperty('render')) ) {
				attr = key+'.'+keys;
				val = key+' '+keys;
				var querry = (obj={}, obj[attr]=val, obj);

				break;
			}
		}
		break;
	}

	MongoClient.connect(serverConfig.mongoDbURI, function(err, db) {
    	db.collection(schema.table, {}, function(err, document) {
        	document.remove(querry, function(err, result) {
            	if (err) {
           			console.log('Mongo: '+err);
 				}
          		console.log('One: removed '+result+' documents from collection '+schema.table);
        		db.close();
        	});
    	});
	});
}
