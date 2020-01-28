FROM alpine:3.11

ENV OTSIMOCTL_VERSION=v0.17.2
ENV OTSIMO_ROOT_DIR=/opt/otsimo-games

RUN apk add --update bash ca-certificates curl wget ffmpeg nodejs yarn git python3 py3-setuptools  \
    && python3 -m ensurepip \
    && pip3 install --upgrade awscli s3cmd python-magic \
    && rm -rf /var/cache/apk/* \
    && wget -O /usr/local/bin/otsimoctl https://s3.eu-central-1.amazonaws.com/repos.otsimo.com/gitlab/15371508/${OTSIMOCTL_VERSION}/otsimoctl-linux-amd64 \
    && chmod +x /usr/local/bin/otsimoctl

ADD start.sh /opt/otsimo-generator/start.sh
WORKDIR /opt/otsimo-games

ENTRYPOINT ["sh", "/opt/otsimo-generator/start.sh"]
