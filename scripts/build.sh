#!/usr/bin/env bash

cd "${0%/*}" # cd to the current dir
set -e

. variables.sh

gitHash=$(git rev-parse --short HEAD)
echo $(pwd)
src="$(pwd)/../src"

echo && echo "db"

docker build \
		-t $plumsailDb \
		--file $src/db/Dockerfile \
		$src/db

echo && echo "be"

docker build \
		-t $plumsailBe \
		--build-arg GIT_HASH=$gitHash \
		--file $src/be/Dockerfile \
		$src/be

echo && echo "fe"

docker build \
		-t $plumsailFe \
		--build-arg REACT_GIT_HASH=$gitHash \
		--build-arg REACT_APP_HOST=$plumsailBePublicUrl \
		--build-arg REACT_APP_YANDEX_DISK_OAUTH_TOKEN=$yandexDiskOauthToken \
		--file $src/fe/Dockerfile \
		$src/fe
