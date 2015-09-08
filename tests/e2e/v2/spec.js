var serverFullURL = 'http://localhost:3000';
var user = 'testGeneral';
var password = 'johndoe';
var interact = require('./testLib/interact.js');
var request = require('request');
var fs = require('fs');
var options = {
	url: "",
	rejectUnauthorized: false,
  	headers: {
    	'Host': 'https://localhost:3443/',
		'Connection': 'keep-alive',
		'Accept': 'application/json, text/plain, */*',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.65 Safari/537.36',
		'Referer': 'http://localhost:3000/',
		'Accept-Encoding': 'gzip, deflate, sdch',
		'Accept-Language': 'en-US,en;q=0.8,sk;q=0.6,cs;q=0.4,en-GB;q=0.2',
		'Cookie': ''
     }
};

var schemas = require('../../../data/tests/e2e_test_config.json').schemas;
//var schemas = require('./test_config.json').schemas;
describe('General test:', function() {

	beforeEach(function() {
		console.log('loggin');
		browser.manage().deleteAllCookies();
		browser.get(serverFullURL + '/');
		browser.driver.manage().window().maximize();
		var loginNameEl = element(by.model('user'));
		loginNameEl.sendKeys(user);
		var passwordEl = element(by.model('password'));
		passwordEl.sendKeys(password);
		$('button[ng-show="!profiles"]').click();
		browser.waitForAngular();
	});

	afterEach(function (){
	    var passed = jasmine.getEnv().currentSpec.results().passed();
	    if (!passed) {
	        browser.takeScreenshot().then(function (png)
	        {
				var fileName = jasmine.getEnv().currentSpec.description.split(' ').join('_')+new Date().getTime(); //TODO: use err msg as part of file name
				var stream = fs.createWriteStream(__dirname+'/screenshots/'+fileName+'.png');
				try {
					stream.write(new Buffer(png, 'base64'));
					stream.end();
					console.log('saved ScreenShot');
				}
				catch (err) {console.log (err);}
	        });
	    }
	});
	it('should get schemas', function(done) {
		browser.manage().getCookies().then(function(cookies) {
			var token, name, profile;
			for (var i = 0;i<cookies.length;i++) {
				switch (cookies[i].name) {
					case "profile":
						profile=cookies[i].value;
						console.log(profile);
						break;
					case "securityToken":
						token=cookies[i].value;
						console.log(token);
						break;
					case "loginName":
						name=cookies[i].value;
						console.log(name);
						break;
				}
			}
			options.headers.Cookie='securityToken='+token+'; loginName='+name+'; profile='+profile;
			for(key in schemas) {
				options.url = schemas[key].new;
				(function(type, options) {
					request(options, function(error, response, body) {
						if (!error && response.statusCode == 200) {
							schemas[type].newSchema = (JSON.parse(body));
							console.log('n:<<'+schemas[type].newSchema.title+'>> w/ StatusCode==200');
			   			} else {if (!error) {console.log('statusCode=='+response.statusCode);done(false)} else {console.log('* error *');done(false)}}
        			});
    			})(key, options);
				options.url = schemas[key].search;
				(function(type, options) {
					request(options, function(error, response, body) {
						if (!error && response.statusCode == 200) {
							schemas[type].searchSchema = (JSON.parse(body));
							console.log('s:<<'+schemas[type].searchSchema.title+'>> w/ StatusCode==200');
			   			} else {if (!error) {console.log('statusCode=='+response.statusCode);done(false)} else {console.log('* error *');done(false)}}
        			});
    			})(key, options);
			}
		}).then(function() {browser.sleep(1000); console.log('done w/ getting schema'); done();});
	});

	for (key in schemas) {
		if (key==key) { //quick way to run only one test
		(function(key) {
			it('should create '+key, function() {
				console.log(schemas[key].newSchema.title);
				for (req in schemas[key].dependencies) {
					console.log(key+' req -> '+schemas[key].dependencies[req]);
					var foo = schemas[key].dependencies[req].split(':');
					interact.create(schemas[foo[0]],(foo[1] != undefined ? foo[1] : []));
				}
				interact.createFull(schemas[key], key);
				interact.check(schemas[key],key);
			});
			it('should erase '+key, function() {
				if (schemas[key].newSchema.table == 'people') {interact.eraseOne(schemas['people'].newSchema)}
					else {interact.erase(schemas[key].newSchema.table);}
				for (req in schemas[key].dependencies) {
					var foo = schemas[key].dependencies[req].split(':');
					if (schemas[foo[0]].newSchema.table == 'people') {
						interact.eraseOne(schemas['people'].newSchema);
					}
					else {interact.erase(schemas[foo[0]].newSchema.table);}
				}
			});
		})(key);
	}
	}

});
