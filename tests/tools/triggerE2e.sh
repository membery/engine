#!/bin/bash
if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
	echo "This is not Pullrequest. Therefore it wont run e2e test on MaxKarel/membery_sauceConnect"
else
	echo "Pull #=" "${TRAVIS_PULL_REQUEST}"
	node tests/tools/triggerE2eTest.js
fi
