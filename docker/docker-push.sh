#!/usr/bin/env bash
set -e

# configuration variables
REGISTRY_USER=$1
REGISTRY_KEY=$2
VERSION=${3:-latest}
DOCKER_IMAGE_NAME="kaleidosteam/patio-front:$VERSION"
LOG_HEADER="PATIO: "

function usage {
    echo "Usage: docker-push.sh registry_user registry_key"
}

function check_registry_credentials {
    if [ -z "$REGISTRY_USER" ]; then
        echo "$LOG_HEADER registry user not present"
        usage
        exit 1
    fi

    if [ -z "$REGISTRY_KEY" ]; then
        echo "$LOG_HEADER registry password not present"
        usage
        exit 1
    fi
}

function push {
    # check credentials
    check_registry_credentials

    # first login to the remote registry
    echo "$LOG_HEADER login to remote registry"
    docker login -u $REGISTRY_USER -p $REGISTRY_KEY $DOCKER_REGISTRY

    # tagging image
    echo "$LOG_HEADER tagging image before pushing"
    docker tag $DOCKER_IMAGE_NAME $DOCKER_IMAGE_NAME

    # if login was successful then push the image
    echo "$LOG_HEADER pushing image to remote registry"
    docker push $DOCKER_IMAGE_NAME
}

push
