const express = require("express");
const router = express.Router();
const Joi = require("joi");
const httpCodes = require('http-codes');
const {
  registerUser,
  verifyUser,
} = require("../controllers/registerController");

// Add validations to the router folder.
router.post("/register", async (req, res) => {
    
    if (req.body) {

        const registerSchema = Joi.object({
          first_name: Joi.string().min(2).max(20).required(),
          last_name: Joi.string().min(2).max(20).required(),
          password: Joi.string().required(),
          email: Joi.string().email({ tlds: { allow: false } }),
        });
    
        const validationObject = registerSchema.validate(req.body);

        if (validationObject.error) {
            res.status(httpCodes.BAD_REQUEST);
            res.send(validationObject.error);
            res.end();
        }

        try {
            const userResponse = await registerUser(req.body);
            // TODO: User need to verify the email within 60 min. isExpired : true, isExpired: false
            // TODO: If email already exists send the message user already exists.
            res.send(userResponse);
            res.status(httpCodes.OK);
        } catch (error) {
            console.log("Error while registering the user", error);
            res.status(httpCodes.INTERNAL_SERVER_ERROR);
        }

        res.end();
        return;
    }

    res.status(httpCodes.BAD_REQUEST);
    res.end();
});

// Verify the user email address when user click on the email link.
router.get("/verifyUser", async (req, res) => {
    try {
        const userEmail = req.query.email;
        const userUUIDToken = req.query.token;

        // TODO: Add proper return status format
        if (userEmail && userUUIDToken) {
            const response = await verifyUser(userEmail, userUUIDToken);
            res.send(response).status(httpCodes.OK);
        }
    } catch (error) {
         console.log("Error while verifying the user", error);
         res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
    }
    res.end();
});

// Verify the user email address when user click on the email link.
router.get("/login", async (req, res) => {
    try {
        if (req.body) {
            const email = req.body.email;
            const password = req.body.password;
        }

        // TODO: Make Login Controller.
    } catch (error) {
         console.log("Error while verifying the user", error);
         res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
    }
    res.end();
});

module.exports = router;