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
