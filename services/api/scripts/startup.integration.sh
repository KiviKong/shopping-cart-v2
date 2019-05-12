#!/bin/bash

set -e

# shellcheck disable=SC1091
source /var/lib/core/database/wait-for-postgres.sh

npm install

# shellcheck disable=SC1091
source /var/lib/core/database/sequelize-migrations.sh

node integration_seeds

nodemon app.js
