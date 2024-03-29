const userModel = require("../Models/userModel");
const { createRandomHexColor } = require("./helperMethods");

const register = async (user, callback) => {
  const newUser = userModel({ ...user, color:createRandomHexColor()});
  await newUser
    .save()
    .then((result) => {
      return callback(false, { message: "User created successfuly!" });
    })
    .catch((err) => {
      return callback({ errMessage: "Email already in use!", details: err });
    });
};

const login = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user) return callback({ errMessage: "Your email/password is wrong!" });
    return callback(false, { ...user.toJSON() });
  } catch (err) {
    return callback({
      errMessage: "Something went wrong",
      details: err.message,
    });
  }
};

const getUser = async (id, callback) => {
  try {
    let user = await userModel.findById(id);
    if (!user) return callback({ errMessage: "User not found!" });
    return callback(false, { ...user.toJSON() });
  } catch (err) {
    return callback({
      errMessage: "Something went wrong",
      details: err.message,
    });
  }
};


const getUserProfile = async (userId, callback) => {
  try {
    // Get user
    const user = await userModel.findById(userId);

    // Remove unnecessary properties
    const { password, boards, ...userProfile } = user.toJSON();

    return callback(false, userProfile);
  } catch (error) {
    return callback({ msg: 'Something went wrong', details: error.message });
  }
};

const updateUser = async (userId, updatedUser, callback) => {
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return callback({ errMessage: "User not found!" });
    }

    // Update the user's details
    user.name = updatedUser.name;
    user.surname = updatedUser.surname;
    user.email = updatedUser.email;
    user.password = updatedUser.password;

    await user.save();

    return callback(false, { message: "User updated successfully!" });
  } catch (error) {
    return callback({ msg: 'Something went wrong', details: error.message });
  }
};


const getUserWithMail = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return callback({
        errMessage: "There is no registered user with this e-mail.",
      });
    return callback(false, { ...user.toJSON() });
  } catch (error) {
    return callback({
      errMessage: "Something went wrong",
      details: error.message,
    });
  }
};


module.exports = {
  register,
  login,
  getUser,
  updateUser,
  getUserWithMail,
  getUserProfile,

};
