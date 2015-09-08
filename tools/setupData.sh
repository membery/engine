#!/bin/bash

declare -A datasets

datasets=(
	["demo01"]="https://github.com/membery/data-demo"
)

if [ $# -lt 1 ]; then
	echo "---------------------------------------------"
	echo "Creates data directory for particular dataset"
	echo
	echo "Usage:"
	echo "$0 <dataset>"
	echo
	echo "Known datasets:"
	for set in ${!datasets[@]}; do echo "$set => ${datasets["$set"]}"; done;
	echo
fi

# do stuff
done=0;
for set in ${!datasets[@]}; do
	if [ "$1" == "$set" ]; then
		done=1;
		echo "Requested set $set"
		echo "Cloning ${datasets["$set"]}"
		cd ..
		git clone ${datasets[$set]}
		cd engine
		ln -s ../data-$set data
		exit 0;
	fi
done;

if [ $done -eq 0 ]; then
	echo "Unrecognized dataset $1"
	exit -1;
fi;
