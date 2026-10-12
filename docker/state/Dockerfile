FROM alpine:3.22

WORKDIR /app

RUN apk add --no-cache bash

COPY docker/state/run.sh ./run.sh
COPY docker/state/relay.yaml ./relay.yaml
COPY test/src/_generated/anvil.json ./anvil.json

RUN chmod +x ./run.sh
