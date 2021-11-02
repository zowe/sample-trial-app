# Sample Trial App Image

[![Build ompzowe/sample-trial-app](https://github.com/zowe/sample-trial-app/actions/workflows/sample-trial-app-images.yml/badge.svg)](https://github.com/zowe/sample-trial-app/actions/workflows/sample-trial-app-images.yml)

## General Information

This image can be used to start sample-trial-app.

It includes 2 Linux Distro:

- Ubuntu
- Red Hat UBI

Each image supports both `amd64` and `s390x` CPU architectures.

## Usage

Image `zowe-docker-release.jfrog.io/ompzowe/sample-trial-app:latest` should be able to run with minimal environment variables:

Example commands:

```bash
# pull image
docker pull zowe-docker-release.jfrog.io/ompzowe/sample-trial-app:latest
# start container
docker run -it --rm \
    zowe-docker-release.jfrog.io/ompzowe/sample-trial-app:latest
```
