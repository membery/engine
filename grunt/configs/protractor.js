module.exports = {
	protractor: {
		'e2e-chrome': {
			options: {
				configFile: 'tests/config/e2e.chrome.conf.js',
				keepAlive: false
			},
			saucelabs: {
				options: {
					args: {
						sauceUser: process.env.SAUCE_USERNAME,
						sauceKey: process.env.SAUCE_ACCESS_KEY
					}
				}
			}
		},
		'e2e-firefox': {
			options: {
				configFile: 'tests/config/e2e.firefox.conf.js'
			}
		},
		'smoke-chrome': {
			options: {
				configFile: 'tests/config/smoke.chrome.conf.js'
			}
		},
		'smoke-firefox': {
			options: {
				configFile: 'tests/config/smoke.firefox.conf.js'
			}
		}
	},
	shell: {
	   protractor_update: {
		   command: 'node_modules/protractor/bin/webdriver-manager update'
	   }
	}
};
