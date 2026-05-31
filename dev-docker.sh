#!/bin/bash -eu
set -o pipefail

build_image() {
  docker build --build-arg FROZEN_MODE=false .
}

build_image
docker run -it --rm --volume $PWD:/work -p 4000:4000 "$(build_image --quiet)"
