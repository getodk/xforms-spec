#!/bin/bash -eu
set -o pipefail

docker build .
docker run -it --rm --volume $PWD:/work -p 4000:4000 "$(docker build --build-arg FROZEN_MODE=false --quiet .)"
