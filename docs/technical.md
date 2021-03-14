# Technical

This page describes the different parts of the application and what they are supposed to do. It explains how express is configured.

Application file structure :

```
├── app.js              // Main
├── datas               // Database interface
│   ├── AlbumDAO.js
│   ├── DB.js
│   ├── SongDAO.js
│   └── UserDAO.js
├── models              // Objects classes
│   ├── Album.js
│   ├── Song.js
│   └── User.js
├── routes              // Express routes and endpoints
│   ├── routes.js
│   └── api
│       ├── albums.js
│       ├── login.js
│       └── songs.js
└── system              // Express middleware
    ├── corsHandler.js
    ├── errorHandler.js
    ├── logHandler.js
    └── tokenHandler.js
```

## app.js

**app.js** is the entry point of the application. It checks for any missing environment variables then instantiate a new express application.

Express is then configured to parse incoming requests payload as json into javascript objects.

```js
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

The following line checks if we are in `prod` environment and enables the **logHandler**.

```js
if (process.env.ENV === 'prod') app.use(logHandler);
```

Then the **corsHandler** and routes are setup on the `/` endpoint. For any other endpoint, the application sends a **notFoundError** to the **errorHandler**. The **errorHandler** is the final middleware of the application, if an error occurs, the response will describe it.

```js
app.use('/', corsHandler(), routes);

app.use('*', (req, res, next) =>
    next(notFoundError(`No endpoint found that matches '${req.originalUrl}'`))
);

app.use(errorHandler);
```

Finally, the server is set to listen on the APP_HOST and APP_PORT environment variables.

```js
const server = app.listen(APP_PORT, APP_HOST, () => {
    const { address, port } = server.address();
    console.log(
        `SimpleMusic API - 1.0 listening on port http://${address}:${port}!`
    );
});
```

## routes directory

The routes directory contains the main router, **routes.js**, and the **api** sub-directory. This sub-directory stores multiple js file, each implementing functions for the api. Their names match the uri endpoint from which they will be called. (eg: albums.js for /albums)

**routes.js** configures the express.Router() which is then used by **app.js**. To do so, it imports every function described in the api sub-directory and set them for each routes for example to set the albums routes:

```js
routes
    .route('/albums')
    .post(tokenHandler, albums.postAlbum)
    .get(tokenHandler, albums.getAlbums);
routes
    .route('/albums/:album_id')
    .get(tokenHandler, albums.getAlbum)
    .put(tokenHandler, albums.putAlbum)
    .delete(tokenHandler, albums.deleteAlbum);
```

Notice the **tokenHandler**, it is a middleware made to handle user authentification. This means that the `/albums` routes is restricted and if the user doesn't meet the requirements (a valid jsonwebtoken) an error will be returned.

If you want to understand how your requests are handled, check the api sub-directory. Each function represents an HTTP method for the specified endpoint.

## system directory

This is where our middlewares are described.

Briefly:

-   **corsHandler**: setup cors headers (allows other websites to fetch ressources from the api).
-   **errorHandler**: contains multiple methods to return specific errors to the user.
-   **logHandler**: logs in the console what is happening.
-   **tokenHandle**: checks if the user is authenticated.

## models directory

The API uses javascript classes to process and store data. They are described by the models available in the models directory. Each js file is a class containing properties and methods. We can take a look at the Album class :

```js
class Album {
    constructor(id, name, author) {
        this._id = id;
        this._name = name;
        this._author = author;
    }

    setId(id) { this._id = id; }
    getId() { return this._id; }

    setName(name) { this._name = name; }
    getName() { return this._name; }

    setAuthor(author) { this._author = author; }
    getAuthor() { return this._author; }

    toObject() {
        return {
            id: this._id,
            name: this._name,
            author: this._author,
        };
    }
}
```

Its a simple class with a unique identifier, a name and an author. There are getters and setters to access and modify properties. The **toObject** method allows us to transform those properties into a json object and send it to the user.

## datas directory

The **DB.js** class is a singleton which handles the database connection. It is used by our DAOs to create requests on the database.

As you can see each DAO is named after a class, this means that we store everything into the database. We then executes queries to retrieve the data we need. For instance, if we want to get a specific user:

```js
async get(userId) {
    const client = await DB.open();
    const result = await client.query(
        'SELECT * FROM "user" WHERE user_id = $1',
        [userId]
    );

    return result && result.rows && result.rows[0]
        ? new User(
            result.rows[0].user_id,
            result.rows[0].user_username,
            result.rows[0].user_password
          )
        : null;
}
```

First, a database connection is setup. The query is then executed and finally the result is stored in a User object.
