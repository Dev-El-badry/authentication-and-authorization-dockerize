# Design API For Authentication And Authorization Service

<div align="center">
  <strong >Authentication And Authorization Service ERD</strong>
</div>


<img align="right" src="https://i.imgur.com/k8csc4r.png" alt="ERD usage" />


## Usage

To get started, make sure you have Docker installed on your system, and then clone this repository.

Next, navigate in your terminal to the directory you cloned this, and spin up the containers for the web server by running

```sh
docker-compose up -d --build
```

Bringing up the Docker Compose network site instead of just using up, ensures that only our site's containers are brought up at the start, instead of all of the command containers as well. The following are built for our web server, with their exposed ports detailed:

- **nginx** - `:3050`
- **mongoDB** - `:27017`
- **api** - `:5000`
- **redis** - `:6379`
- **mongo-express** - `:8081`

You can access your application via localhost, if you're running the containers directly
[link] (http://localhost:3050)

## API Collection of Authentication And Authorization app on postman

[Authentication And Authorization Service app collection](https://www.getpostman.com/collections/ba21b1d10ef9a8ac84db)

## Running the tests

To get started, make sure you have NODE installed on your system,.

Next, navigate in your terminal to the directory you cloned this, run command below:
`npm install && npm install --save-dev`

- running tests:
  `npm run test`

\*\* Note our running test outside the container to prevent container to upload large libraries like: `mongodb-memory-server` every time change `package.json`
[mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)

## API

- [x] implemented JWT based security in a test Core Web API REST project
- [x] perform queuing and caching using redis to avoid hit the database.

## Authentication

- [x] Sign In
- [x] Sign Up
- [x] Me
- [x] Logout

## Users
- [x] get all users
- [x] assign role to user 

## Roles

- [x] Create
- [x] Update
- [x] Delete
- [x] Show

## Permissinos

- [x] get all permissions

