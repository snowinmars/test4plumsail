#!/usr/bin/env bash

cd "${0%/*}" # cd to the current dir

. variables.sh
root="$(pwd)/../src/db"

imageId=$( docker ps | grep $plumsailDb | awk '{print $1;}' )

if [[ -z ${imageId} ]]
then
    echo Image $plumsailDb is down
    exit 0
fi



sqls=$( find "$root/migrations" -name "*.psql" -type f | sort )
total=$( find "$root/migrations" -name "*.psql" -type f | wc -l )
count=0

for sql in ${sqls}
do
	((count++))
	printf "[%-2s / %-2s] Deploying schema %-30s \n" $count $total $sql
	name=$(basename $sql)
    docker cp ${sql} ${imageId}:${name}
    docker exec ${imageId} psql ${plumsailDatabaseName} -U ${plumsailDatabaseUser} -f ${name} --quiet
done



sqls=$( find "$root/procedures" -name "*.psql" -type f | sort )
total=$( find "$root/procedures" -name "*.psql" -type f | wc -l )
count=0

for sql in ${sqls}
do
	((count++))
	printf "[%-2s / %-2s] Deploying procedure %-30s \n" $count $total $sql
	name=$(basename $sql)
    docker cp ${sql} ${imageId}:${name}
    docker exec ${imageId} psql ${plumsailDatabaseName} -U ${plumsailDatabaseUser} -f ${name} --quiet
done



echo "Took $SECONDS seconds"