#!/bin/bash
declare -A datasets
datasets=(
	["szh"]="https://github.com/MaxKarel/data-szh.git"
	# ["uavas"]="https://github.com/membery/data-uavas.git"
	# ["sbf"]="https://github.com/membery/data-sbf.git"
	# ["caihp"]="https://github.com/membery/data-caihp.git"
	# ["us"]="https://github.com/membery/data-us.git"
	["felis"]="https://github.com/MaxKarel/data-felis.git"
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
	Reqversion= cat $ReqPath
	ComPath="COMPATIBILITY_VERSION"
	ComPath=$PWD"/data/"$ComPath
	ComVersion= cat $ComPath
	if [ $ComVersion = $Reqversion ]; then
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
