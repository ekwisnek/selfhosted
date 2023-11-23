#!/bin/sh

get_json() {
    JSON_TEMPLATE_LIST=${JSON_TEMPLATE_LIST}
    JSON_GENERATOR_TOKEN=${JSON_GENERATOR_TOKEN}
    JSON_GENERATOR_URL=${JSON_GENERATOR_URL}
    SELECTED_TEMPLATE=${JSON_TEMPLATE_LIST}
    /usr/bin/curl \
    --silent \
    --request GET \
    -H "Authorization: Bearer ${JSON_GENERATOR_TOKEN}" \
    --url ${JSON_GENERATOR_URL}/${SELECTED_TEMPLATE}/data \
    > ./payload.json
}

nats_publish() {
    NATS_URL=${NATS_URL}
    NATS_USER=${NATS_USER}
    NATS_PASSWORD=${NATS_PASSWORD}
    NATS_TOPIC=${NATS_TOPIC}
    COUNT=${RANDOM}
    SLEEP_SECONDS=$(( ${RANDOM} % 10 + 1 ))
    printf "Publishing ${COUNT} mesages to topic ${TOPIC}...\n"
    /usr/local/bin/nats pub \
    --user=${NATS_USER} \
    --password=${NATS_PASSWORD} \
    --count=${COUNT} \
    ${NATS_TOPIC} \
    @payload.json

    printf "Sleeping ${SLEEP_SECONDS}...\n"
    /bin/sleep ${SLEEP_SECONDS}
}

get_json

while true; do
    nats_publish
done
