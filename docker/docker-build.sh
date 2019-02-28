#!/usr/bin/env bash
set -e

# configuration variables
API_URL=$1
VERSION=${2:-latest}
DOCKER_REGISTRY="kaleidos-docker-registry.bintray.io"
DOCKER_IMAGE_NAME="$DOCKER_REGISTRY/dwbh/dwbh-front:$VERSION"
LOG_HEADER="DWBH: "

function usage {
    echo "Usage: dwbh-docker-build.sh api_url"
}

function check_api_url {
    # checking first param exists
    if [ -z "$API_URL" ]; then
        echo "$LOG_HEADER missing api url parameter"
        usage
        exit 1
    fi

    # checking first param is a valid url
    if [[ "$API_URL" != http* ]]; then
        echo "$LOG_HEADER Are you sure parameter order is correct ? API_URL doesn't start with http."
        usage
        exit 1
    fi
}

function build {
    echo "$LOG_HEADER building $DOCKER_IMAGE_NAME"
    # check api url has been provided
    check_api_url

    TMP_DIR=/tmp/dwbh-front-$(date +%s)
    # create a temporal directory to build the docker image
    echo "$LOG_HEADER creating building folder"
    mkdir -p $TMP_DIR

    # copy all artifacts
    echo "$LOG_HEADER copying project to building folder"
    cp -r ../. $TMP_DIR

    # move configuration files to build root folder
    echo "$LOG_HEADER copying configuration files to building folder"
    cp Dockerfile $TMP_DIR
    cp nginx.conf $TMP_DIR

    # set the execution folder to build root folder
    echo "$LOG_HEADER setting working dir"
    cd $TMP_DIR

    # change .env api url
    echo "$LOG_HEADER changing .env api url to $API_URL"
    sed -i "s,\$DWBH_API_URL,$API_URL,g" .env

    # and build the image
    echo "$LOG_HEADER executing docker build"
    docker build -t $DOCKER_IMAGE_NAME .
}

build