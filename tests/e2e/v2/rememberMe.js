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
if(process.env._=='/usr/local/bin/protractor') {options.headers.host='https://localhost:3443/'; serverFullURL='https://localhost:3443'}
describe('General test:', function() {

	beforeEach(function() {
		console.log('loggin');
		browser.get(serverFullURL + '/');
		browser.driver.manage().window().maximize();
		var loginNameEl = element(by.model('user'));
		var passwordEl = element(by.model('password'));
		browser.waitForAngular();
	});


	it('should not check and expect false', function(){
		var loginNameEl = element(by.model('user'));
		var passwordEl = element(by.model('password'));
		var confirmButton = $('button[ng-show="!profiles"]');

		loginNameEl.sendKeys(user);
		passwordEl.sendKeys(password);
		confirmButton.click();
		browser.waitForAngular();
		browser.manage().getCookies().then(function(cookies) {
			console.log(cookies);
			expect(cookies[1].value).toBe(false);
			expect(element(by.id('main-menu').isPresent())).toBe(true);
		});
	});

	it('should check and expect true (and also try if it works)', function(){
		var loginNameEl = element(by.model('user'));
		var passwordEl = element(by.model('password'));
		var confirmButton = $('button[ng-show="!profiles"]');
		var rememberMe = element(by.model('rememberMe'));

		loginNameEl.sendKeys(user);
		passwordEl.sendKeys(password);
		rememberMe.click();
		confirmButton.click();
		browser.manage().getCookies().then(function(cookies) {
			expect(cookies[1].value).toBe(true);
			expect(element(by.id('main-menu').isPresent())).toBe(true);
		});
	});
});
