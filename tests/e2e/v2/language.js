var serverFullURL = 'http://localhost:3000/';
var user = 'testGeneral';
var password = 'johndoe';
var fs = require('fs');
var options = {
	url: "",
	rejectUnauthorized: false,
  	headers: {
    	'Host': 'http://localhost:3000/',
		'Connection': 'keep-alive',
		'Accept': 'application/json, text/plain, */*',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.65 Safari/537.36',
		'Referer': 'http://localhost:3000/',
		'Accept-Encoding': 'gzip, deflate, sdch',
		'Accept-Language': 'en-US,en;q=0.8,sk;q=0.6,cs;q=0.4,en-GB;q=0.2',
		'Cookie': ''
     }
};
console.log(process.env);
if(process.env._=='/usr/local/bin/protractor') {options.headers.host='https://localhost:3443/'; serverFullURL='https://localhost:3443'}
describe('General test:', function() {

	beforeEach(function() {
		console.log('loggin');
		browser.get(serverFullURL + '/');
		browser.driver.manage().window().maximize();
		/*var loginNameEl = element(by.model('user'));
		var passwordEl = element(by.model('password'));
		var confirmButton = $('button[ng-show="!profiles"]');
		loginNameEl.sendKeys(user);
		passwordEl.sendKeys(password);
		confirmButton.click();*/
		browser.waitForAngular();

	});

	it('should check if language does change', function() {
		var langDiv = element(by.css('div[class="login-form-lang"]')).all(by.css('a'));
		var langNo = langDiv.count();
		console.log(langNo);
		for (var i = 0; i<=langNo-1; i++) {
			langDiv.get(i).click();
			browser.manage().getCookies().then(function(cookies) {
				expect(cookies.)
			}
		}
	});


});
