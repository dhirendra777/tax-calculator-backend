const express = require("express");
const verifyToken = require("./middleware/auth");
var cors = require('cors');

const port = 3000;
const app = express();

/* Enable cors */
app.use(cors());

/* Initialize database */
const localStorage = require("./database");

/* Parse URL-encoded bodies (as sent by HTML forms) */
app.use(express.urlencoded());

/*  Parse JSON bodies (as sent by API clients) */
app.use(express.json());


/* Register routes */
require('./routes')({ app, localStorage, verifyToken});

//Start the server
app.listen(port, () => {
    console.log(`server is started on ${port}`);
})