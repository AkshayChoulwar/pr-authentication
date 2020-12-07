const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

/**
 * User registration work flow.
 * @param {*} payload Register user request.
 */
async function registerUser(payload) {
    try {
      const { email } = payload;
      const emailExists = await User.findOne({ email: email});

      if (emailExists) {
        return "Email Already Exists";
      }

      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(payload.password, salt);
      const userPayload = { ...payload, isActive: false, password: hashPassword };
    
      const usersPayload = new User(userPayload);
      const newUser = await usersPayload.save({
          timestamps: true
      })

      return newUser;
    
    } catch (error) {

        throw error;   
    }
}

module.exports = {
  registerUser
};