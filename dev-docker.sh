#!/bin/bash -eu
set -o pipefail

tag=odk-xform-spec-dev

docker build -t "$tag" --build-arg FROZEN_MODE=false .
exec docker run -it --rm --init -v "$(pwd):/work" -p 4000:4000 "$tag"
