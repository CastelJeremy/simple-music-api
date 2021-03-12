# Welcome to SimpleMusic API

SimpleMusic API is a Rest API built with [Express.js](http://expressjs.com), [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) and [node-postgres](https://github.com/brianc/node-postgres). It offers a set of routes secured with a Bearer token to execute CRUD methods.

## Requirements

Before installing the API make sure

-   Your nodejs configuration supports ECMAScript 6 features.
-   A Postgresql database is setup.

## Setting up the database

Use the following SQL script to create the required database format:

```sql
CREATE TABLE public.album (
    album_id serial PRIMARY KEY,
    album_name character varying(100) NOT NULL,
    album_author character varying(100) NOT NULL
);

CREATE TABLE public.song (
    song_id serial PRIMARY KEY,
    album_id integer NOT NULL,
    song_name character varying(100) NOT NULL,
    song_length integer NOT NULL,
    CONSTRAINT album_song_fk
        FOREIGN KEY (album_id)
            REFERENCES public.album(album_id)
);

CREATE TABLE public."user" (
    user_id serial PRIMARY KEY,
    user_username character varying(20) NOT NULL UNIQUE,
    user_password character varying(64) NOT NULL
);
```

## Installation

1. **Clone the project repository**  
   `git clone https://github.com/CastelJeremy/simple-music-api.git /project/directory`

2. **Run npm install**  
   `npm install`

## Configuration

The `.env` available in the project directory must be configured in order to test and run the api.
Example of a correct .env configuration :

```txt
DB_HOST = example.com
DB_PORT = 5432
DB_NAME = db_demo
DB_USER = user1
DB_PASS = 1234
APP_HOST = 127.0.0.1
APP_PORT = 8000
ENV = prod
```

## Testing

If you which to test the API make sure :

1.  devDependencies are installed `npm install --save-dev`.
2.  the demo user is in your database, check the `fixtures.sql` file.

Then run the following command:

```bash
npm run test
```

Expected result:

```txt
        ...
        ✓ should return status 401
        ✓ should return status 404 (109ms)
      DELETE
        ✓ should return a song (206ms)
        ✓ should return status 401
        ✓ should return status 404 (56ms)


  32 passing (3s)

```

## Running

_\*Testing the api is optionnal but highly recommended_

Run the following command:

```
npm run start
```

If you are on a linux server, configuring a .service file is recommended.

## Documentation

An extensive documentation made with [MkDocs](https://www.mkdocs.org/) is available in this repository.

-   `mkdocs build`  
    Build the documentation and output the result in **/project_directory/site/**.

-   `mkdocs serve`  
    Serve the documentation on [http://localhost:8000](http://localhost:8000)

## Author

[CASTEL Jeremy](https://github.com/CastelJeremy)
