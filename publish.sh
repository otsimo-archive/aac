#!/bin/sh

gulp build
cd dist/prod
gversion=$(jq .version --raw-output otsimo.json)
gname=$(jq .unique_name --raw-output otsimo.json)


if [ "$1" = "staging" ];then
    export OTSIMOCTL_DISCOVERY_ENV="$1"
    export OTSIMOCTL_DISCOVERY=services.otsimo.xyz:30862
fi

otsimoctl game publish
otsimoctl game change-state $gname $gversion waiting
otsimoctl game change-state $gname $gversion validated
otsimoctl game change-state $gname $gversion production
