# Starting the REST server

## 1. Clone the repository and go into the project directory
```
$ git clone https://https://github.com/amos-ws16/amos-ws16-arrowjs-server.git arrowjs-server
$ cd arrowjs-server
```

## 2. Setup the environment
Configure the port the server will listen on, the administrator's password, and the secret used to sign tokens through the environment variables `ARROW_LISTEN_PORT`, `ARROW_ADMIN_PASSWORD`, `ARROW_TOKEN_SECRET` respectively. Also, setup the mongo database connection using the environment variables `ARROW_DATABASE_*`, e.g. in bash:
```
$ export ARROW_LISTEN_PORT=3000
$ export ARROW_ADMIN_PASSWORD=foobar
$ export ARROW_TOKEN_SECRET=verysecretthing
$ export ARROW_DATABASE_HOST=localhost
$ export ARROW_DATABASE_PORT=27017             # optional, default 27017
$ export ARROW_DATABASE_USER=dbuser            # optional, default no user
$ export ARROW_DATABASE_PASSWORD=dbpassword    # optional, default no password
```

## 3. Make sure the MongoDB is running
The server needs a database connection to run, so the database configured in the previous section must be running before starting the REST server.

## 3. Start the server

You can start the server from the command line with:
```
$ npm start
```
This will use the port that was configured in the environment variable to listen for SSL encrypted connections.

*Note*: Make sure to place your SSL key as `key.pem` and your certificate as
        `cert.pem` in the `cert/` directory if you want to use encryption! You
        can generate a self-signed certificate using
        `scripts/generate-self-signed-cert.sh`.

To start the server without encryption enabled use the development mode by
running `npm run dev`.


The server is now listening for connections on port 3000 and the administrator can get an authentication token using the login `admin` and password provided through `ARROW_ADMIN_PASSWORD` by posting to `/api/auth`:
```
curl -X POST -H 'Content-Type: application/json' -d '{ "name": "admin", "password": "foobar" }' http://hostname:3000/api/auth
```
