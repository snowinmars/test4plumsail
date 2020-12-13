#!/usr/bin/env bash

. variables.sh

docker volume list | grep -w $plumsailDatabaseVolumeName
if [[ $? -ne 0 ]]; then
	psqlDir=$plumsailDatabaseVolumeHostPath
	mkdir -p ${psqlDir}

	docker volume create \
		--opt type=none \
		--opt device=${psqlDir} \
		--opt o=bind \
		$plumsailDatabaseVolumeName
fi


docker volume list | grep -w $plumsailLogsVolumeName
if [[ $? -ne 0 ]]; then
	logsDir=$plumsailLogsVolumeHostPath
	mkdir -p ${logsDir}

	docker volume create \
		--opt type=none \
		--opt device=${logsDir} \
		--opt o=bind \
		$plumsailLogsVolumeName
fi

docker network list | grep -w $plumsailNetworkName
if [[ $? -ne 0 ]]; then
	docker network create --subnet=$plumsailNetworkSubnet $plumsailNetworkName
fi

set -e

db_id=$( docker run -d \
		 -p $plumsailDbHostPort:$plumsailDbContainerPort \
		 --net $plumsailNetworkName \
		 --ip $plumsailDbIp \
		 -v $plumsailLogsVolumeName:/var/log/postgresql \
		 -v $plumsailDatabaseVolumeName:/var/lib/postgresql/12/main \
		 -e PGDATA=/var/lib/postgresql/data/pgdata \
		 $plumsailDb )


be_id=$( docker run -d \
		-p $plumsailBeHostPort:$plumsailBeContainerPort \
		--net $plumsailNetworkName \
		--ip $plumsailBeIp \
		-v $plumsailLogsVolumeName:/app/_logs \
		-e PSQL_HOST=$plumsailDbIp \
		-e PSQL_PORT=$plumsailDbHostPort \
		-e PSQL_DATABASE_NAME=$plumsailDatabaseName \
		-e PSQL_USER=$plumsailDatabaseUser \
		$plumsailBe )

fe_id=$( docker run -d \
		-p $plumsailFeHostPort:$plumsailFeContainerPort \
		--net $plumsailNetworkName \
		--ip $plumsailFeIp \
		-v $plumsailLogsVolumeName:/var/log/nginx/logs \
		$plumsailFe )

printf "docker %-3s image id is %-64s \n" "ngx" $ngx_id
printf "docker %-3s image id is %-64s \n" "fe" $fe_id
printf "docker %-3s image id is %-64s \n" "be" $be_id

printf "%-12s is listening on %-16s : %-5s , %-5s \n" $plumsailNgx $plumsailNgxIp $plumsailNgxHttpHostPort $plumsailNgxHttpHostPorts
printf "%-12s is listening on %-16s : %-5s \n" $plumsailFe $plumsailFeIp $plumsailFeHostPort
printf "%-12s is listening on %-16s : %-5s \n" $plumsailBe $plumsailBeIp $plumsailBeHostPort

echo

# two seconds is enough for images to fail
printf "Checking that images is still running"
sleep 0.5
printf "."
sleep 0.5
printf "."
sleep 0.5
printf "."
sleep 0.5
printf ".\n"

echo

docker ps