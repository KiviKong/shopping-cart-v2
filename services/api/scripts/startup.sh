#!/bin/bash

set -x -u -e

aws-secrets-manager.sh shopping-cart/api/development/${AWS_SM_ENV} -- ./node_modules/.bin/sequelize db:migrate --config config/config.js
aws-secrets-manager.sh shopping-cart/api/development/${AWS_SM_ENV} -- ./node_modules/.bin/sequelize db:seed:all --config config/config.js --seeders-path seeders/${NODE_ENV}-seeders/
aws-secrets-manager.sh shopping-cart/api/development/${AWS_SM_ENV} -- node app.js
