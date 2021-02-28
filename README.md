# Simple Music API

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

3. **Configure the database connection**  
   Edit 'datas/DB.js'.  
   Change the pg.Pool parameters to match your Postgres configuration.

4. **Configure the host and port**  
   Edit 'app.js'.  
   Change the app.listen parameters to fit your needs.

5. **Test the API** \*_Optionnal_  
   Make sure devDependencies are installed.  
   Make sure there is a default user with:  
   username = demo_username and password = demo_password.  
   `npm run test`

6. **Start the API**  
   `npm run start`

## Author

-   CASTEL Jeremy
