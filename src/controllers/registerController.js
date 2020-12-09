const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../helpers/emailUtil");
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
      const uuidToken = uuidv4();

      const userPayload = {
        ...payload,
        isActive: false,
        password: hashPassword,
        uuidToken,
      };
    
      const usersPayload = new User(userPayload);

      const newUser = await usersPayload.save();

      const { _id, first_name, last_name, createdAt, updatedAt } = newUser;

      // Create Link:
      const verifyLink = `http://localhost:7777/api/users/verifyUser?email=${newUser.email}&token=${newUser.uuidToken}`;
      
      const mailOptions = {
        from: process.env.EMAIL,
        to: newUser.email,
        subject: "Confirm Product Hunt Account",
        html: `<h4>Please click on the below link:</h4><br>${verifyLink}`,
      };
      
      await sendEmail(mailOptions);
      
      return {
        userID: _id,
        email: newUser.email,
        first_name,
        last_name,
        createdAt,
        updatedAt
      };

    
    } catch (error) {
        throw error;   
    }
}

/**
 * Verify If user is valid or not using email
 * @param {*} userEmail User Email
 * @param {*} userToken User UUID Token
 */
async function verifyUser(userEmail, userToken) {
  try {
    console.log("verifyUser called");
    const user = await User.findOne({email: userEmail});

    if (user.uuidToken === userToken) {
      user.isActive = true;
      await user.save();
      return "Verified"
    } else {
      return "Token does not match";
    }

  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  verifyUser
};