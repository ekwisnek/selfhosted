FROM natsio/nats-box:latest
RUN mkdir /app \
    && apk add curl
COPY ./randompublish.sh /app
WORKDIR /app
ENV JSON_TEMPLATE_LIST=null
ENV JSON_GENERATOR_TOKEN=null
ENV JSON_GENERATOR_URL=null
ENV NATS_URL=null
ENV NATS_USER=null
ENV NATS_PASSWORD=null
ENV NATS_TOPIC=null
CMD ["/bin/sh", "-c", "/app/randompublish.sh"]
