# Authentication

The Rest API is secured with a Bearer Token.

-   The token is a [jsonwebtoken](https://jwt.io/).
-   Users are stored in the user table.
-   Their password must be a sha256 of the plain text password.
-   The username must be unique.

### Token

The POST method from the login route will handle the authentication process. Send the username and the password in the body of your request. If your user is valid and exists in the database, the access-token is returned in the Response.  
If there is a problem, an error will be returned.  
[More details](routes.md#errors)

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

To access secured routes, the Bearer token must be set in the Authorization header.  
[More details](routes.md#introduction)

```bash
curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://host/albums
```

```json
// Response Body
[
    { "id": 879, "name": "Minecraft - Volume Alpha", "author": "C418" },
    { "id": 884, "name": "Minecraft - Volume Beta", "author": "C418" }
]
```
