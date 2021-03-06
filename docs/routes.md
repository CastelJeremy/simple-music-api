# Routes

Routes respects different HTTP Methods for CRUD execution. POST to create, GET to read, PUT to update and DELETE to delete.

Every routes is secured and requires a valid token except the `/login` route which provides an authentification endpoint.

## Overview

List of available routes and methods:

| End Point         | HttpMethods      | Require Token |
| ----------------- | ---------------- | ------------- |
| /login            | POST             | No            |
| /albums           | POST, GET        | YES           |
| /albums/:album_id | GET, PUT, DELETE | YES           |
| /songs            | POST, GET        | YES           |
| /songs/:song_id   | GET, PUT, DELETE | YES           |

<br>
## Requests

POST and PUT methods requires json objects in the request. POST will create the object and PUT update an existing object. The PUT won't create a new object and requires a valid object (eg: sending only the name of the album will return an error).

The following list displays the expected request body foreach POST and PUT.

**Login**

```json
// POST
{
    "username": "demo_username",
    "password": "demo_password"
}
```

**Albums**

```json
// POST, PUT
{
    "name": "Minecraft - Volume Alpha",
    "author": "C418"
}
```

**Songs**

```json
// POST, PUT
{
    "album": {
        "id": 879,
        "name": "Minecraft - Volume Alpha",
        "author": "C418"
    },
    "name": "Key",
    "length": 65
}
```

## Responses

If your request is correctly executed, the body of the response will show performed changes. However if your request is invalid you will receive an [Error](#errors).

The following list displays examples of response.

---

**Login**

```json
// POST
{
    "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

---

**Albums**

```json
// POST
{
    "id": 885,
    "name": "DOOM 2016 Soundtrack",
    "author": "Mick Gordon"
}
```

```json
// GET
[
    { "id": 879, "name": "Minecraft - Volume Alpha", "author": "C418" },
    { "id": 884, "name": "Minecraft - Volume Beta", "author": "C418" },
    { "id": 885, "name": "DOOM 2016 Soundtrack", "author": "Mick Gordon" }
]
```

```json
// GET :album_id
{
    "id": 885,
    "name": "DOOM 2016 Soundtrack",
    "author": "Mick Gordon"
}
```

```json
// PUT :album_id
{
    "id": 885,
    "name": "DOOM 2016 - Soundtrack",
    "author": "Mick Gordon"
}
```

```json
// DELETE :album_id
{
    "id": 885,
    "name": "DOOM 2016 - Soundtrack",
    "author": "Mick Gordon"
}
```

---

**Songs**

```json
// POST
{
    "id": 396,
    "album": { "id": 884, "name": "Minecraft - Volume Beta", "author": "C418" },
    "name": "Beginning 2",
    "length": 176
}
```

```json
// GET
[
    {
        "id": 354,
        "album": { "id": 879, "name": "Minecraft - Volume Alpha", "author": "C418" },
        "name": "Key",
        "length": 65
    },
    {
        "id": 371,
        "album": { "id": 879, "name": "Minecraft - Volume Alpha", "author": "C418" },
        "name": "Sweden",
        "length": 215
    },
    {
        "id": 396,
        "album": { "id": 884, "name": "Minecraft - Volume Beta", "author": "C418" },
        "name": "Beginning 2",
        "length": 176
    }
]
```

```json
// GET ?album_id=879
[
    {
        "id": 354,
        "album": { "id": 879, "name": "Minecraft - Volume Alpha", "author": "C418" },
        "name": "Key",
        "length": 65
    },
    {
        "id": 371,
        "album": { "id": 879, "name": "Minecraft - Volume Alpha", "author": "C418" },
        "name": "Sweden",
        "length": 215
    }
]
```

```json
// GET :song_id
{
    "id": 396,
    "album": { "id": 884, "name": "Minecraft - Volume Beta", "author": "C418" },
    "name": "Beginning 2",
    "length": 176
}
```

```json
// PUT :song_id
{
    "id": 396,
    "album": { "id": 884, "name": "Minecraft - Volume Beta", "author": "C418" },
    "name": "Beginning 2",
    "length": 176
}
```

```json
// DELETE :song_id
{
    "id": 396,
    "album": { "id": 884, "name": "Minecraft - Volume Beta", "author": "C418" },
    "name": "Beginning 2",
    "length": 176
}
```

## Errors

If something goes wrong, the response will contain an error. The API handles 3 different types of errors:

-   _Bad Request_, if the body of your request doesn't respect the expected format. ([Routes#Requests](#requests))
-   _Unauthorized_, if you didn't provide a valid Bearer token for a secured route or if your token has expired.
-   _Not Found_, the requested id could not be found in the database.

Example of a response displaying an error:

```json
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Missing or invalid parameters for POST '/login'. Expecting username as string and password as string."
}
```

List of possible errors:

| statusCode | error        | Priority |
| ---------- | ------------ | -------- |
| 400        | Bad Request  | 2        |
| 401        | Unauthorized | 1        |
| 404        | Not Found    | 3        |

<br>
Priorities defines which error should be returned if multiple errors occurs.  
(eg: a POST on /albums without a valid token and a valid request will return **Error 401**).  
(eg: a PUT on /albums without a valid request and an unknow album_id will return **Error 400**).

List of possible messages for the _Bad Request_ error.

```txt
 - Missing or invalid parameters for POST '/login'. Expecting username as string and password as string.
 - Missing or invalid parameters for POST '/albums'. Expecting name and author as string.
 - Missing or invalid parameters for PUT '/songs'. Expecting album as object, name as string and length as number.
```

List of possible messages for the _Not Found_ error.

```txt
 - No album found that matches the ID 9999
 - No song found that matches the ID 9999
```
