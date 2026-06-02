#!/bin/bash -eu
set -o pipefail

tag=odk-xform-spec-dev

docker build -t "$tag" .
exec docker run -it --rm -v "$PWD:/work" -p 4000:4000 "$tag"
