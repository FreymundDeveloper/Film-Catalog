## Description

Film Catalog is a Back-End CRUD application linked to a REST API. The application is entirely developed using TypeScript using the Nest.js framework, with database integration using TypeORM. This application uses PostgresSQL as its default database, along with Redis for caching.

Some technologies used:

* TypeScript;
* Nest.js;
* TypeORM;
* Swagger;
* Docker;
* Redis;
* PostgreSQL;
* Jest.

## Running the app

**Required**: Redis server installed and running on your local machine. Otherwise, comment the RedisModule call in src/app.module.ts.

```bash
# Installation
$ npm install

# Running
$ npm run start

# Tests
$ npm run test
```
## Documentation

Application documentation is automatically generated using Swagger, and along with the rest of the application runs at "http://localhost:3000/". Below are some simplifi examples of shipping data and the routes themselves:

* Swagger - /api;
* Token - /auth/login;
* Post - /movies/create - Body: { "name": string, "studio": string, year: number };
* Get - /movies/read - QueryParams: {"name"};
* Put - /movies/update/:name;
* Delete - /movies/delete/:name;

To perform CRUD, first generate a token through the specified route, then link it to a "Bearer Token" authorization:
(Postman example: Authorization > Type > Bearer Token)

To access the complete and detailed API documentation, use the Swagger route.

## Docker

**Warning**: It is necessary to change the “host” field in the “ormconfig.postgres.json” and “ormconfig.redis.json” files. Change the “host” from “localhost” to the name of the database the configuration belongs to (“postgres” or “redis”). 

**Explanation**: This action is necessary due to a conflict between the configuration files and the default builder configurations in the docker containers themselves.

```bash
# Build
$ docker-compose up
```