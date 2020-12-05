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

        res.send("Request Accepted....!! Congrats !!");
        res.end();
    }
    res.end();
});

module.exports = router;