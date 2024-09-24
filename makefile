include .env

.PHONY: up

up:
	docker-compose up -d

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs

.PHONY: databases

databases:
	docker-compose up db_postgres db_mongo