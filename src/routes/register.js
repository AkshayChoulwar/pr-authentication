const express = require("express");
const router = express.Router();
const Joi = require("joi");
const httpCodes = require('http-codes');

router.post("/register", (req, res) => {
    
    if (req.body) {

        const registerSchema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            password: Joi.string().required()
        });
    
        const validationObject = registerSchema.validate(req.body);

        if (validationObject.error) {
            res.status(httpCodes.BAD_REQUEST);
            res.end();
        }

        res.send("Request Accepted....!! Congrats !!");
        res.end();
    }
    res.end();
});

module.exports = router;