const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

// Load the register router.
const registerRouter = require("./src/routes/register");
// Load the login router.
const loginRouter = require("./src/routes/login");

// Create the express application.
const app = express();

// Use the config defined in the .env file.
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", registerRouter);
app.use("/api/user", loginRouter);

const port = process.env.AUTH_PORT || 9999;

mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log("Error connecting to the database", err);
        return;
    }
    console.log("Connected to the database successfully !!");
});
// Listen to the authentication port.
app.listen(port, () => console.log(`Server started on port number: ${port}`));