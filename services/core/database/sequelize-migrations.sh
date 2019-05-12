#!/bin/bash

./node_modules/.bin/sequelize db:migrate --config config/config.js
./node_modules/.bin/sequelize db:seed:all --config config/config.js --seeders-path seeders/${NODE_ENV}-seeders/
