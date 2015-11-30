var Travis = require('travis-ci');

// change this
var repo = "https://github.com/MaxKarel/membery_sauceConnect";

var travis = new Travis({
	version: '2.0.0'
});

travis.authenticate({

	// available through Travis CI
	// see: http://kamranicus.com/blog/2015/02/26/continuous-deployment-with-travis-ci/
	github_token: '685c71238d3a41850794'+'de132fd228c07c5c7a7e'

}, function (err, res) {
	if (err) {
		return console.error(err);
	}
	travis.repos('MaxKarel','membery_sauceConnect').builds.get(function (err, res) {
		if (err) {
			return console.error(err);
		}
		travis.requests.post({
			build_id: res.builds[0].id
		}, function (err, res) {
			if (err) {
				return console.error(err);
			}
			console.log(res.flash[0].notice);
		});
	});
});
