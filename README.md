# Design API For Authentication And Authorization Service

<div align="center">
  <strong >Authentication And Authorization Service ERD</strong>
</div>


<img align="right" src="https://i.imgur.com/k8csc4r.png" alt="ERD usage" />


## Usage

To get started, make sure you have Docker installed on your system, and then clone this repository.

Next, navigate in your terminal to the directory you cloned this, and spin up the containers for the web server by running

```sh
docker-compose up --build -d
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


## Steps
1- add domain permission by adding json file into rule directory.
2- run command `docker-compose exec app npm run permission:import`.
**NOTE** if you want to delete permission by running command `docker-compose exec app npm run permission:delete`
3- from postman collection get all permissions that added by script (http://localhost:3050/api/v1/permissions).
4- create new a role and added your permissions to a role.
5- after finishing all above steps .. assign a role to a user (http://localhost:3050/api/v1/role)

**NOTE** if user has super admin can access to all routes 

## big challenge way to handle permission for each domain in the project and check user if has access to allow action on this route by:

1- create .json file for each domain with permission and some info (module - name - ability - method). using (method) to define the action of the route
2- run command to collect all permissions and added to the collection ... by running script to get rules from each domain
3- and assign permissions to a role
4- assign roles to users 

## API
- [x] implemented JWT based security in a test Core Web API REST project

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



