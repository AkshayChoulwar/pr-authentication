const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

/**
 * User registration work flow.
 * @param {*} payload Register user request.
 */
async function registerUser(payload) {
    try {
      const unique_id = uuidv4();
      
      // User payload
      const userPayload = { ...payload, isActive: false };
    
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