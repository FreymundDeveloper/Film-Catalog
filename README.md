## Description

Film Catalog is a Back-End CRUD application linked to a REST API. The application is entirely developed using TypeScript using the Nest.js framework, with database integration using TypeORM. This application uses PostgresSQL as its default database, along with Redis for caching.

About the technologies required and my experience with them:

* TypeScript - 4 months of experience;
* Nest.js - First contact with technology;
* TypeORM - First contact with technology;
* Swagger - 9 months of professional experience (Used with IRIS);
* Docker - 2 month and a half experience (Mainly used with Ruby on Rails);
* Redis - 2 months of experience;
* PostgreSQL - First time used in a real application. I already had contact with her in the Database course at college;
* API RESTful - 1 year and a half of experience and 9 months of professional experience;
* Google AppEngine - First contact (I usually use AWS or DigitalOcean).

## Running the app

**Required**: Redis server installed and running on your local machine. Otherwise, comment the RedisModule call in src/app.module.ts - Consequence of current problems in Docker.

```bash
# Installation
$ npm install

# Running
$ npm run start
```
## Documentation

Application documentation is automatically generated using Swagger. Briefly, this route mapping is structured as follows:

* IP - 
* localhost - 3000 (http://localhost:3000/);

Routes:

* Swagger - /api;
* Token - /auth/login;
* Create - /movies/create;
* Read - /movies/read;
* Update - /movies/update/:name;
* Delete - /movies/delete/:name;

To perform CRUD, first generate a token through the specified route, then link it to a "Bearer Token" authorization:
(Postman example: Authorization > Type > Bearer Token)

To access the complete and detailed API documentation, use the Swagger route.

## Docker - Is not working

```bash
# Build
$ docker-compose up --build
```

## Time spent and difficulties

In total I spent around 26 hours developing the project. My biggest time consumption was configuring the nest environment and integrating TypeORM with PostgreSQL. It took me a total of 12 hours in this process, the main reason being my lack of contact with these technologies.Another factor that was a huge time consuming for the development of the project was the Docker configuration. It took me a total of 6 hours in this process, due to an error communicating with the database, which in the end I was unable to resolve:

* ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)... 2023-11-26 23:03:31 Error: connect ECONNREFUSED 127.0.0.1:5432

Another 5 hours were consumed in configuring the application deployment process for Google AppEngine and the other 3 hours were used for the development of CRUD itself, along with the configuration of Swagger and Redis.