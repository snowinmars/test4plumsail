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



echo "If the next (the drop) command will throw an exception, check out the reason"
echo "It's fine, if the database wasn't exists"
echo "It's not fine, if it was locked or whatever"

docker exec ${imageId} psql -c "drop database $plumsailDatabaseName;"
docker exec ${imageId} psql -c "create database $plumsailDatabaseName;"



sqls=$( find "$root/schemas_migrations" -name "*.psql" -type f | sort )
total=$( find "$root/schemas_migrations" -name "*.psql" -type f | wc -l )
count=0

for sql in ${sqls}
do
	((count++))
	printf "[%-2s / %-2s] Deploying schema %-30s \n" $count $total $sql
	name=$(basename $sql)
    docker cp ${sql} ${imageId}:${name}
    docker exec ${imageId} psql ${plumsailDatabaseName} -U ${plumsailDatabaseUser} -f ${name} --quiet
done



sqls=$( find "$root/procedures_migrations" -name "*.psql" -type f | sort )
total=$( find "$root/procedures_migrations" -name "*.psql" -type f | wc -l )
count=0

for sql in ${sqls}
do
	((count++))
	printf "[%-2s / %-2s] Deploying procedure %-30s \n" $count $total $sql
	name=$(basename $sql)
    docker cp ${sql} ${imageId}:${name}
    docker exec ${imageId} psql ${plumsailDatabaseName} -U ${plumsailDatabaseUser} -f ${name} --quiet
done



echo "Took $SECONDS seconds over $count scripts"
