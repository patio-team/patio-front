# dwbh
[![Build Status](https://travis-ci.com/dont-worry-be-happy/dwbh-front.svg?branch=master)](https://travis-ci.com/dont-worry-be-happy/dwbh-front)
[![Coverage Status](https://coveralls.io/repos/github/dont-worry-be-happy/dwbh-front/badge.svg?branch=master)](https://coveralls.io/github/dont-worry-be-happy/dwbh-front?branch=master)


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
For typescript:

```
yarn run lint
```

For style:

```
yarn run lint:style
```

### Run your unit tests
```
yarn run test:unit
```

Some useful options:

- `--watch` to run in dev mode (watch files for changes and rerun tests related to changed files).
- `--coverage` to get coverage info.

### Run your end-to-end tests
```
yarn run test:e2e
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Quick setup (with docker)

### Build docker image
```
cd docker

./docker-build.sh $BACK_END_HTTP [$VERSION]
```

If you don't set any version `latest` will be used.

### Run docker image
```
docker run -it -p 9000:80 --rm --name dwbh-front kaleidos-docker-registry.bintray.io/dwbh/dwbh-front:latest
```

### Push docker image to Kaleidos Bintray
```
cd docker

./docker-push.sh $USERNAME $PASSWORD [$VERSION]
```

If you don't set any version `latest` will be used.
