include .env

.PHONY: up

up:
	docker-compose up

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs

.PHONY: api

api: 
	docker-compose up api