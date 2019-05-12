#!/bin/bash

set -ue

values=$(aws secretsmanager get-secret-value --secret-id $1 | jq -r '.SecretString')

for s in $(echo $values | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" ); do
  export $s
done

[[ $@ =~ ^(.+)( -- )(.+)$ ]]

exec ${BASH_REMATCH[3]}
