#!/bin/bash

export OTSIMO_ROOT_DIR="${OTSIMO_ROOT_DIR:-/opt/otsimo-games}"

echo "clone '$OTSIMO_GIT_BRANCH' brach of '$OTSIMO_GIT_REPOSITORY' repository to $OTSIMO_ROOT_DIR"
git clone -b $OTSIMO_GIT_BRANCH $OTSIMO_GIT_REPOSITORY $OTSIMO_ROOT_DIR

cd $OTSIMO_ROOT_DIR

echo "install node packages..."
yarn

echo "start generator..."
yarn run generator
