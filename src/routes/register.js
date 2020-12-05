const express = require("express");
const router = express.Router();
const Joi = require("joi");
const httpCodes = require('http-codes');

router.post("/register", (req, res) => {
    
    if (req.body) {

        const registerSchema = Joi.object({
          first_name: Joi.string().min(2).max(20).required(),
          last_name: Joi.string().min(2).max(20).required(),
          email: Joi.string().email({ tlds: { allow: false } }),
        });
    
        const validationObject = registerSchema.validate(req.body);

        if (validationObject.error) {
            res.status(httpCodes.BAD_REQUEST);
            res.send(validationObject.error);
            res.end();
        }

        const { first_name, last_name, email } = req.body;

        // TODO: Connect to the database.
        // TODO: Store the first name, last name and email in the database.
        // TODO: Active field to the user schema. If user verifies the email then mark active to true else false.
        // TODO: User need to verify the email within 60 min. isExpired : true, isExpired: false
        // TODO: If email already exists send the message user already exists. 
        res.send("Request Accepted....!! Congrats !!");
        res.end();
    }
    res.status(httpCodes.BAD_REQUEST);
    res.end();
});

module.exports = router;