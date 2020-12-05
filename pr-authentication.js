const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

// Create the express application.
const app = express();

// Use the config defined in the .env file.
require("dotenv").config();

app.use(bodyParser.json());

// Load the register router.
const registerRouter = require("./src/routes/register");

app.use("/api/users", registerRouter);

const port = process.env.AUTH_PORT || 9999;

// Listen to the authentication port.
app.listen(port, () => console.log(`Server started on port number: ${port}`));