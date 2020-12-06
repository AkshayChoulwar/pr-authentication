const express = require("express");
const router = express.Router();
const Joi = require("joi");
const httpCodes = require('http-codes');
const registrationController = require("../controllers/registerController");

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
            const userResponse = await registrationController.registerUser(req.body);
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

module.exports = router;