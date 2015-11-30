#!/bin/bash
declare -A datasets
datasets=(
	["szh"]="https://github.com/MaxKarel/data-szh.git"
	["uavas"]="https://github.com/MaxKarel/data-uavas.git"
	# ["sbf"]="https://github.com/MaxKarel/data-sbf.git"
	# ["caihp"]="https://github.com/MaxKarel/data-caihp.git"
	["us"]="https://github.com/MaxKarel/data-us.git"
	# ["felis"]="https://github.com/MaxKarel/data-felis.git"
	# ["svf"]="https://github.com/MaxKarel/data-svf.git"
	# ["def"]="https://github.com/MaxKarel/data-def"
)

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

	rm -f "data"
	ln -s ../data-$set data

	ReqPath="REQUIRED_VERSION"
	ReqPath=$PWD"/"$ReqPath
	ReqVersion=$(<$ReqPath)
	ComPath="COMPATIBILITY_VERSION"
	ComPath=$PWD"/data/"$ComPath
	ComVersion=$(<$ComPath)
	echo $ComVersion
	echo $ReqVersion
	if [ $ComVersion = $ComVersion ]; then
		grunt
		if [ "$?" = 0 ]; then
			echo grunt run successfully
		else
			echo "!!!!!!!!!!!!something happend to grunt"
			exit -1
		fi
		grunt e2e
		if [ "$?" != 0 ]; then
			echo "grunt e2e test didnt return 0"
			exit 1
		fi
	else
		echo "versions are incompatible"
	fi
done;
