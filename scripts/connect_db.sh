#!/usr/bin/env bash

. variables.sh

imageId=$( docker ps | grep $plumsailDb | awk '{print $1;}' )

if [[ -z ${imageId} ]]
then
    echo Image $plumsailDb is down
    exit 0
fi

docker exec -it $imageId psql $plumsailDatabaseName -U $plumsailDatabaseUser
