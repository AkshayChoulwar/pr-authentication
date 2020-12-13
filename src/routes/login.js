const express = require("express");
const router = express.Router();
const Joi = require("joi");
const httpCodes = require("http-codes");
const { login } = require("../controllers/loginController"); 

// Check the user is valid or not.
// If valid then return the token.
router.post("/login", async (req, res) => {
   try {
       const loginSchema = Joi.object({
         password: Joi.string().required(),
         email: Joi.string().email({ tlds: { allow: false } }),
       });

       const validationObject = loginSchema.validate(req.body);

       if (validationObject.error) {
         res.status(httpCodes.BAD_REQUEST);
         res.send(validationObject.error);
         res.end();
         return;
       }
        
       const loginToken = await login(req.body.email, req.body.password);

       if (loginToken) {
           res.header['pr-auth-token'] = loginToken;
           res.status(httpCodes.OK);
       } else {
           res.status(httpCodes.BAD_REQUEST);
       }

   } catch (error) {
       console.log("Error while logging into the application", error);
       res.status(httpCodes.INTERNAL_SERVER_ERROR);
    } 
    res.end();
});

module.exports = router;
