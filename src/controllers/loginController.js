const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/**
 * Method used to login into the application,
 * @param {*} req Request Object
 * @param {*} res Response Object
 */
async function login(email, password) {
    try {
        const user = await User.findOne({ email });
        const storedPassword = user.password;

        const isValidPassword = await bcrypt.compare(password, storedPassword);

        if (isValidPassword) {
            // Create JWT Token
            const token = jwt.sign({
                name: user.first_name,
                last_name: user.last_name,
                email
            }, process.env.SECRETE_KEY);
            return token;
        }
    } catch (error) {
        throw error;
    }
}



module.exports = {
    login
}