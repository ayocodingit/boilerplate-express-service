include ./src/.env
	
APP_PATH := cd ./src
DOCKER_FILE_PATH := ./docker/Dockerfile.dev
ENV_PATH := ./src/.env
DOCKER_APP_NAME := express-app
DOCKER_ENV_PATH := --env-file ${ENV_PATH}
DOCKER_DEV := -f docker-compose-dev.yml ${DOCKER_ENV_PATH}
DOCKER_DEV_EXEC := ${DOCKER_DEV} exec ${DOCKER_APP_NAME}

install:	
	${APP_PATH}; npm install

dev:	
	${APP_PATH}; npm run dev

start:
	${APP_PATH}; npm run start

lint:
	${APP_PATH}; npm run lint

latest:
	${APP_PATH}; knex migrate:latest

rollback:
	${APP_PATH}; knex migrate:rollback

up:
	${APP_PATH}; knex migrate:up

down:
	${APP_PATH}; knex migrate:down

docker-run:
	docker-compose ${DOCKER_ENV_PATH} up -d

docker-stop:
	docker-compose ${DOCKER_ENV_PATH} down

docker-run-dev-build:
	docker build -f ${DOCKER_FILE_PATH} -t ${APP_NAME} .

docker-run-dev:
	docker-compose ${DOCKER_DEV} up -d

docker-run-dev-stop:
	docker-compose ${DOCKER_DEV} down

docker-run-dev-latest:
	docker-compose ${DOCKER_DEV_EXEC} knex migrate:latest

docker-run-dev-rollback:
	docker-compose ${DOCKER_DEV_EXEC} knex migrate:rollback

docker-run-dev-up:
	docker-compose ${DOCKER_DEV_EXEC} knex migrate:up

docker-run-dev-down:
	docker-compose ${DOCKER_DEV_EXEC} knex migrate:down

