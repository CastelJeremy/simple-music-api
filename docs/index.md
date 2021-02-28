# Welcome to SimpleMusic API

Securely store songs and albums in a postgres database. Access those songs and albums with simple HTTP requests.

Made with [Express.js](http://expressjs.com), [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) and [node-postgres](https://github.com/brianc/node-postgres).

## Introduction

SimpleMusic API uses HTTP request to create, read, edit and delete data from the database. If you want to execute those requests, you must get an access-token.

### Token

An access-token is given in response of a POST request on the `http://host/login` endpoint with a valid user in the body.

```bash
curl -d '{"username":"demo_username", "password":"demo_password"}' -H "Content-Type: application/json" -X POST http://host/login
```

```json
// Response Body
{
    "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

### Token Usage

With this access-token, you can now execute different requests to manipulate your data.

```bash
curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://host/albums
```

```json
// Response Body
[
    { "id": 879, "name": "First Album", "author": "Jeremy CASTEL" },
    { "id": 884, "name": "Second Album", "author": "Jeremy CASTEL" }
]
```

## Author

-   CASTEL Jeremy
