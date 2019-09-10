FROM alpine:3.10

ENV OTSIMOCTL_VERSION=v0.16.2
ENV OTSIMO_ROOT_DIR=/opt/otsimo-games

RUN apk add --update bash ca-certificates curl wget nodejs yarn git python py-pip \
    && pip install --upgrade awscli s3cmd python-magic \
    && apk -v --purge del py-pip \
    && rm -rf /var/cache/apk/* \
    && wget -O /usr/local/bin/otsimoctl https://github.com/otsimo/otsimoctl/releases/download/$OTSIMOCTL_VERSION/otsimoctl-linux-amd64 \
    && chmod +x /usr/local/bin/otsimoctl

ADD start.sh /opt/otsimo-generator/start.sh
WORKDIR /opt/otsimo-games

ENTRYPOINT ["sh", "/opt/otsimo-generator/start.sh"]
