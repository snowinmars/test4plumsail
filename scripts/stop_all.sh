#!/usr/bin/env bash

. variables.sh
set -e

ids=$(docker ps | grep $plumsailDockerName | awk '{print $1;}')
total=$(docker ps | grep $plumsailDockerName | wc -l)

count=1
echo "Stopping $total containers..."

for id in ${ids}; do
	printf "%-2s / %-2s %-8s is gone" $count $total $(docker stop $id)
    ((count++))
    echo
done
