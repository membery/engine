var universalDaoModule = require('./../../build/server/UniversalDao.js');
var mongoDriver = require('./../../build/server/mongoDriver.js');
var config = require('./../../build/server/config.js');

module.exports.beforeProtractorLaunch = beforeProtractorLaunch;

function beforeProtractorLaunch () {
mongoDriver.init(config.mongoDbURI, function(err) {
	if (err) {
		throw err;
	}

	console.log(mongoDriver.getDb);


	var _daoProfiles = new universalDaoModule.UniversalDao(mongoDriver, {
		collectionName : "securityProfiles"
	});

	var testProfile={
			"id": "53cd19d5502cd4915bd08724",
			"baseData": {
				"name": "testProfile"
			},
			"forcedCriteria": {
			},
			"security": {
				"permissions": {
					"System User": true,
					"Security - read": true,
					"Security - write": true,
					//"System Admin": true,

					"AgeCategory - read":true,
					"AgeCategory - write":true,
					"Club - write": true,
					"Club - read": true,
					"Club - read - KM":true,
					"Club - write - KM":true,
					"Stadium - read":true,
					"Stadium - write":true,
					"Competition - read":true,
					"Competition - write":true,
					"CompetitionPart - read":true,
					"CompetitionPart - write":true,
					"Schedule - read":true,
					"Schedule - write":true,
					"Season - read": true,
					"Season - write":true,
					"Person - read - KM":true,
					"Person - write - KM":true,
					"RefereeReport - read - KM":true,
					"RefereeReport - write - KM":true,
					"RefereeReport - read": true,
					"RefereeReport - write": true,


					"Requests - read - KM": true,
					"Requests - read":true,
					"Requests - write - KM": true,
					"Requests - write":true,
					"Request - solve": true,

					"Requisitions - read - KM": true,
					"Requisitions - write - KM": true,

					"Registry Requisitions": true,
					"Registry People": true,
					"Registry Requests": true,
					"Registry Club": true,
					"Registry - read": true,
					"Registry - write": true,
					"Registry Competitions": true,
					"Registry Fees": true,
					"Registry Stadium": true,
					"Registry Organization": true,
					"Registry Massmail":true,
					"Portal - write":true,
				},
				"groups": {

				}
			}
		};

		var defaultProfile={
			"id": "53cd19d5502cd4915bd08720",
			"baseData": {
				"name": "default"
			},
			"forcedCriteria": {
				"uri://registries/member#search": {
					"criteria": {
						"0": {
							"f": "contactInfo.street",
							"op": "lt",
							"v": "3"
						},
						"1": {
							"f": "baseData.name",
							"op": "neq",
							"v": "454"
						}
					}
				}
			},
			"security": {
				"permissions": {
					"System User": true,
					"Registry - read": true,
					"Registry - write": true
				},
				"groups": {

				}
			}
		};

	var _dao = new universalDaoModule.UniversalDao(mongoDriver, {
		collectionName : "people"
	});
	// _daoProfiles.save(defaultProfile,function(err){
	// 	console.log(err);
	// });
	_daoProfiles.save(testProfile,function(err,data){

		console.log(data);
		_collection = mongoDriver.getDb().collection("people");
		// _collection.drop();
		_collection.ensureIndex({
			"systemCredentials.login.loginName" : 1
		},{
			unique : true,
			sparse : true
		},function(err) {
			if (err){
				console.log(err);
			}
			var johndoe={
				"id": "55953f4b76fcf774513a68ec",
				"systemCredentials": {
					"login": {
						"loginName": "testGeneral",
						"passwordHash": "mcHWq0FyMluy3U3nGQJeYuR6ffSDxgtG1SaejicXJvdxyM/1NUP7X5Kx3LpvsAQ+XOq8Hs+maYLiEXDQYr3OCh2o+gtTxvhEz9Z4Bem0J09v7GyxdkD2S2zED7Obr6XzPzpaxaYfmFBHRR5iy2JDRx/lAcBM1L0qFfBnoXoGYm6jcUn6Klht9xoPnYGvDVdxtjWG9GqBrLfIJb1Aot3WCPOAG0BzlidfjdG0exJhkC0eOTwgFG4D8vP/AOblI2N+skZ3ztDb6NIxRIyd70bDooUhB7HcRnJgsrqBGg68UfBReHXYFnQYYa7Fv4/mR+4y+N+SpFXokYcKUI0e6sCPcQ==",
						"email": "websupport@unionsoft.sk",
						"salt": "johndoe"
					},
					"profiles": ["53cd19d5502cd4915bd08724"]
				},
				"baseData": {
					"name": "TestGeneral",
					"bornNumber": "771010/1010",
					"surName": "UnionSoft s.r.o.",
					"birthDate": "19771010",
					"nationality": "SVK",
					"gender": "M"
				},
				"contactInfo": {
					"email": "websupport@unionsoft.sk",
					"street": "Galvaniho",
					"houseNumber": "17/B",
					"city": "Bratislava ",
					"phoneNumber": "+421 2 50267 117",
					"zipCode": "821 04",
					"country": "SVK"
				}
			};
			_dao.save(johndoe, function (err,data){
				console.log('User saved (err=='+err+') [collection=='+config.mongoDbURI)+']';
				mongoDriver.close();
			});
		});
	});

});

}