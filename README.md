# dwbh
[![Build Status](https://travis-ci.com/dont-worry-be-happy/dwbh-front.svg?branch=master)](https://travis-ci.com/dont-worry-be-happy/dwbh-front)

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

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Quick setup (with docker)

### Build docker image
```
docker build -t dwbh/front .
```

### Run docker image
```
docker run -it -p 9000:80 --rm --name dwbh-front dwbh/front
```
