# Mountain Dev ⛰

## Development

Make sure you have Docker and Docker Compose installed.

To start all the services just run the following Docker Compose command:

```
docker-compose -f docker-compose.dev.yml up
```

This starts the client, server and database on ports 3000, 4000 and 5432 respectively.
Make sure those ports are free on your machine, so that Docker can bind the relevant services to them.
Running it for the first time builds the docker images and installs all dependencies, so it may take a while.
Subsequent runs should be relatively quick.

Once everything is up and running you should be able to access the app at [`localhost:3000`](http://localhost:3000)
and the GraphQL playground at [`localhost:4000/api`](http://localhost:4000/api).

Having the containers running you can easily execute custom commands inside them,
just as you'd do on your machine. A few examples:

```sh
# Executing commands in running containers takes the following form:
docker-compose -f docker-compose.dev.yml exec SERVICE COMMAND

# Installing new dependency on the client
docker-compose -f docker-compose.dev.yml exec client npm install PACKAGE_NAME

# Formatting code on the client
docker-compose -f docker-compose.dev.yml exec client npm run prettier-fix

# Installing new dependency on the server
docker-compose -f docker-compose.dev.yml exec server npm install PACKAGE_NAME

# Formatting code on the server
docker-compose -f docker-compose.dev.yml exec server npm run prettier-fix

# Creating new migration
docker-compose -f docker-compose.dev.yml exec server npx knex migrate:make MIGRATION_NAME
# Example: docker-compose -f docker-compose.dev.yml exec server npx knex migrate:make create_user_table

# Now write the migration file and then run the migration
docker-compose -f docker-compose.dev.yml exec server npx knex migrate:latest

# Run the database shell
docker-compose -f docker-compose.dev.yml exec database psql -U postgres
```
