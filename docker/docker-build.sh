#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

# configuration variables
VERSION=${2:-latest}
DOCKER_IMAGE_NAME="kaleidosteam/patio-front:$VERSION"
LOG_HEADER="PATIO: "

function usage {
    echo "Usage: docker-build.sh"
}

function build {
    echo "$LOG_HEADER building $DOCKER_IMAGE_NAME"

    TMP_DIR=/tmp/patio-front-$(date +%s)
    # create a temporal directory to build the docker image
    echo "$LOG_HEADER creating building folder"
    mkdir -p $TMP_DIR

    # copy all artifacts
    echo "$LOG_HEADER copying project to building folder"
    rsync -a .. $TMP_DIR --exclude node_modules

    # move configuration files to build root folder
    echo "$LOG_HEADER copying configuration files to building folder"

    cp Dockerfile $TMP_DIR
    cp nginx.conf $TMP_DIR

    # set the execution folder to build root folder
    echo "$LOG_HEADER setting working dir"
    cd $TMP_DIR

    # and build the image
    echo "$LOG_HEADER executing docker build"
    docker build -t $DOCKER_IMAGE_NAME .

    # cleaning up
    rm -rf $TMP_DIR
}

build
