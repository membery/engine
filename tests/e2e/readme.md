This is readme file for e2e semi automated tests for protractor
This feature allows you to:
 - run test on current dataset with your version of engine
 - run test with current engine on all schemas
 - run test on newest engine and all newest version of each dataset

0.___Configuration___
each dataset needs its configuration file which is located in data-xxx/tests/e2e_test_config.json
this json file contains "schema" object which contains objects linked to subsection of test which is aimed at one schema (for examle: object "person" has necessary information to create and check values of person)
this is example of such object operating with entity "rosters"
"rosters":{
	"new":"http://localhost:3000/schema/compiled/uri~3A~2F~2Fregistries~2Frosters~23views~2Frosters~2Fnew",
	"search": "http://localhost:3000/schema/compiled/uri~3A~2F~2Fregistries~2Frosters~23views~2Frosters~2Fsearch",
	"searchSchema":"",
	"newSchema": "",
	"listNo": 5,
	"createNo": 0,
	"findNo": 1,
	"dependencies": ["club","seasons","category","association","people:coach","competitions"]
}

 - new and search contain url for new and search schema. when creating new config file you can find them through browser console (network tab)
 - newSchema and searchSchema should be left empty
 - listNo is serial number of list in main-menu
 - createNo is serial number of create new button is sub-list
 - findNo is serial number of find button is sub-list
 - dependencies:
	 	since database is cleared after each test and some schema require other entity, this array creates required entity before creating the main one.
		keyword after ":" also specifies which part of schema (except from required fields) should be field. this is usefull when rosters reuire person which has to be coach
1.___running test on current dataset and engine___
run grunt e2e
currently there is no command line option to run test for only one schema. option is to go to engine/tests/e2e/v2/spec.js and on 83rd line change key for string of schema from config file (key=="rosters")
2.___running test on current engine and newest databse___
run ./tools/e2eTest.sh
3.___run test on newest dataset and engine___
run ./all.sh
file is located in engine/tests/e2e/v2
Note: copy the script to separate folder since it downloads new engine from github/membery and installs npm and bower components
4.___how to work with errors___
when protractor finishes all the tests for one dataset it lists all errors and failed expectations. Here are listed some errors with their most common cause. When resolving errors always look in engine/tests/e2e/v2/screenshots where are screenshots after each error.
element not visible: user does not have permissions for that particular menu part

index out of bound: protractor tried to select some entity from array of 0 elements (add club to player). Either application doesnt show created entities or the entity was not created (it might be missing from dependencies in config)


9.___Creating test for new dataset____
 - create config file and place it in data set
 - sometimes user might need more permissions. you can review them at engine/tests/tools/init-mongo.js
10.___Miscalenous information_____
 - dont click in testing browser it can cause interference and test fails
 - reguests for schemas should be send on http://localhost:3000 not https://localhost:3443
 -
