const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    unique: true,
    required: true,
  },
  last_name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  isActive: Boolean
});

const User = mongoose.model("User", userSchema);

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