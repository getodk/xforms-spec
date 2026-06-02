#!/bin/bash -eu
set -o pipefail

docker build -t odk-xform-spec-dev .
docker run -it --rm -v "$PWD:/work" -p 4000:4000 odk-xform-spec-dev
