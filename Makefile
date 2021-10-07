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

build:
	${APP_PATH}; npm run build

lint:
	${APP_PATH}; npm run lint

migrate:
	${APP_PATH}; npm run migrate

refresh:
	${APP_PATH}; npm run refresh

up:
	${APP_PATH}; npm run up

down:
	${APP_PATH}; npm run down

docker-run:
	docker-compose ${DOCKER_ENV_PATH} up -d

docker-stop:
	docker-compose ${DOCKER_ENV_PATH} down

docker-build:
	docker build ${DOCKER_ENV_PATH} -t boilerplate-express-service .

docker-run-dev-build:
	docker build -f ${DOCKER_FILE_PATH} -t boilerplate-express-service .

docker-run-dev:
	docker-compose ${DOCKER_DEV} up -d

docker-run-dev-stop:
	docker-compose ${DOCKER_DEV} down

docker-run-dev-test:
	docker-compose ${DOCKER_DEV_EXEC} npm run test

docker-run-dev-migrate:
	docker-compose ${DOCKER_DEV_EXEC} npm run migrate

docker-run-dev-refresh:
	docker-compose ${DOCKER_DEV_EXEC} npm run refresh

docker-run-dev-migrate-up:
	docker-compose ${DOCKER_DEV_EXEC} npm run up

docker-run-dev-migrate-down:
	docker-compose ${DOCKER_DEV_EXEC} npm run down

