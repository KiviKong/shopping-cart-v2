CURRENT_DIRECTORY=$(shell pwd)

BASE_COMPOSE=-f $(CURRENT_DIRECTORY)/docker-compose.yml
DEV_COMPOSE=$(BASE_COMPOSE) -f $(CURRENT_DIRECTORY)/docker-compose.dev.yml
TEST_COMPOSE=$(BASE_COMPOSE) -f $(CURRENT_DIRECTORY)/docker-compose.test.yml
E2E_COMPOSE=$(BASE_COMPOSE) -f $(CURRENT_DIRECTORY)/e2e-tests/docker-compose.yml
DEV_E2E_COMPOSE=$(E2E_COMPOSE) -f $(CURRENT_DIRECTORY)/e2e-tests/docker-compose.dev.yml

ifeq ($(AWS_SM_ENV),)
  AWS_SM_ENV=development
endif

ifeq ($(service),)
  service=api
endif

AWS_PROFILE=shopping-cart
AWSSE=./services/core/scripts/aws-secrets-manager.sh

# Build services or build single service with service=name
build:
	@docker-compose $(BASE_COMPOSE) build $(service)

# Ssh into service container
bash:
	@docker-compose $(BASE_COMPOSE) exec $(service) /bin/bash

# Test current build of a service
test:
	@AWS_PROFILE=$(AWS_PROFILE) $(AWSSE) shopping-cart/api/$(AWS_SM_ENV) -- \
		docker-compose $(TEST_COMPOSE) -f $(CURRENT_DIRECTORY)/services/$(service)/docker-compose.test.yml run $(service)

# Destroy test environment
test-down: 
	@docker-compose $(BASE_COMPOSE) down

# Lift dev environment or single service with service=name
dev:
	@AWS_PROFILE=$(AWS_PROFILE) $(AWSSE) shopping-cart/api/$(AWS_SM_ENV) -- \
		docker-compose $(DEV_COMPOSE) -f $(CURRENT_DIRECTORY)/services/$(service)/docker-compose.dev.yml up $(service)

# Destroy dev environment
dev-down:
	@docker-compose $(DEV_COMPOSE) down && docker volume prune

# Logs
logs:
	@docker-compose $(BASE_COMPOSE) logs $(service)

# Integration mode for frontend development and testing
integration:
	@AWS_PROFILE=$(AWS_PROFILE) $(AWSSE) shopping-cart/api/$(AWS_SM_ENV) -- \
		docker-compose $(DEV_COMPOSE) \
		-f $(CURRENT_DIRECTORY)/services/api/docker-compose.dev.yml \
		-f $(CURRENT_DIRECTORY)/docker-compose.integration.yml up -d api
