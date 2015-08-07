#!/bin/bash
declare -A datasets
datasets=(
	["szh"]="https://github.com/membery/data-szh.git"
	#["uavas"]="https://github.com/membery/data-uavas.git"
	#["sbf"]="https://github.com/membery/data-sbf.git"
	#["caihp"]="https://github.com/membery/data-caihp.git"
	["us"]="https://github.com/membery/data-us.git"
	["felis"]="https://github.com/membery/data-felis.git"
)

git clone https://github.com/membery/engine.git
cd engine
git checkout bash
./tools/build.sh
if [ "$?" != 0 ]; then
		echo something happend to build procces

fi

for set in ${!datasets[@]}; do

	echo "Requested set $set"
	if [ -d ../data-$set ]; then
		echo "dataset already downloaded"
	else
		echo "Cloning ${datasets["$set"]}"
		cd ..
		git clone ${datasets[$set]}
		cd engine
	fi
	if [ -d "data" ]; then
		echo "removed data linked to data - $set"
		rm "data"
	fi
	ln -s ../data-$set data
	grunt
	if [ "$?" = 0 ]; then
			echo grunt run successfully
		else
			echo "!!!!!!!!!!!!something happend to grunt"
			exit
	fi
	grunt e2e
done;
