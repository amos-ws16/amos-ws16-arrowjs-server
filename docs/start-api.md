# Start the API on local or external server

You can start the server from the command line with `npm start`. This will use
the default port 3000 to listen for SSL encrypted connections.

To start the server without encryption enabled use the development mode by
running `npm run dev`.

You can change the port of the server by given it as an additional command line
argument, i.e. `npm start -- 4000`.

*Note*: Make sure to place your SSL key as `key.pem` and your certificate as
        `cert.pem` in the `cert/` directory if you want to use encryption! You
        can generate a self-signed certificate using
        `scripts/generate-self-signed-cert.sh`.
