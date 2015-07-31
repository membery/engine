#!/bin/bash
#grunt
echo
if [ "$?" = 0 ]; then
		echo grunt run successfully
	else
		echo something happend to grunt
		exit
fi
declare -A datasets
datasets=(
	["szh"]="https://github.com/membery/data-szh.git"
	["uavas"]="https://github.com/membery/data-uavas.git"
	["sbf"]="https://github.com/membery/data-sbf.git"
)
# do stuff
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
	grunt e2e
done;
#["caihp"]="https://github.com/membery/data-caihp.git"
#["szh"]="https://github.com/membery/data-szh.git"
#["sbf"]="https://github.com/membery/data-sbf.git"
#["uavas"]="https://github.com/membery/data-uavas.git"
