#!/bin/bash
declare -A datasets
datasets=(
	["szh"]="https://github.com/membery/data-szh.git"
	["uavas"]="https://github.com/membery/data-uavas.git"
	["sbf"]="https://github.com/membery/data-sbf.git"
	["caihp"]="https://github.com/membery/data-caihp.git"
)
echo
if [ "$?" = 0 ]; then
		echo build shell run successfully
	else
		echo something happend to build shell
		exit
fi

# do stuff
for set in ${!datasets[@]}; do

	echo "Requested set $set"
	if [ -d ../dataTest-$set ]; then
		echo "dataset already downloaded"
	else
		echo "Cloning ${datasets["$set"]}"
		cd ..
		git clone ${datasets[$set]}
		cd engine
	fi
	if [ -d "data" ]; then
		rm "data"
	fi
	ln -s ../dataTest-$set data
	grunt
	grunt e2e
done;
#["caihp"]="https://github.com/membery/data-caihp.git"
#["szh"]="https://github.com/membery/data-szh.git"
#["sbf"]="https://github.com/membery/data-sbf.git"
#["uavas"]="https://github.com/membery/data-uavas.git"
