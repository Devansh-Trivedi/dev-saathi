const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validatePhoneNumber, validateEmail } = require("../utils/index");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, password, phoneNumber, name, userName } = req.body;
  if (
    !email ||
    !password ||
    !phoneNumber ||
    !name ||
    !userName ||
    userName === "" ||
    email === "" ||
    password === "" ||
    phoneNumber === "" ||
    name === ""
  ) {
    return res.status(400).send({
      error: true,
      message: "Email, password, name, username and phone number are required.",
    });
  } else if (!validateEmail(email)) {
    return res.status(400).send({
      error: true,
      message: "Email is invalid.",
    });
  } else if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).send({
      error: true,
      message: "Phone number is invalid.",
    });
  } else {
    try {
      const user = new User({
        email,
        password,
        phoneNumber,
        name,
        userName
      });
      await user.save();
      res.send({
        success: true,
        message: "Successfully registered"
      });
    } catch (err) {
      if (err.code === 11000) {
        if (err.message.includes("email")) {
          return res.status(400).send({
            error: true,
            message: "Please use a different Email",
          });
        } else if (err.message.includes("phoneNumber")) {
          return res.status(400).send({
            error: true,
            message: "Please use a different Phone Number",
          });
        } else if (err.message.includes("userName")) {
          return res.status(400).send({
            error: true,
            message: "Please use a different username",
          });
        } else {
          return res.status(400).send({
            error: true,
            message: "Something went wrong",
          });
        }
      } else {
        return res.status(400).send({
          error: true,
          message: "Something went wrong",
        });
      }
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).send({
      error: true,
      message: "Email and password is required",
    });
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        error: true,
        message: "Invalid email or password",
      });
    } else {
      try {
        await user.comparePassword(password);
        const token = jwt.sign(
          { userId: user._id, userName: user.userName, email: user.email },
          process.env.JWT_SECRET || "SECRET_KEY"
        );
        user.password = undefined
        return res.send({
          success: true,
          message: "Successfully logged in.",
          data: token,
          user,
        });
      } catch (err) {
        return res.status(400).send({
          error: true,
          message: "Invalid Email or password",
        });
      }
    }
  }
};

const currentUser = async (req, res) => {
  const user = req.user
  user.password = undefined
  return res.send({
    success: true,
    message: "User data.",
    data: user,
  });
};


const updateUserProfile = async (req, res) => {
  try {
    const { name, location, techStack, githubID, linkedin, stackOverflow, previousProjects } = req.body;
    if (!name || name === "") {
      return res.status(400).json({
        error: true,
        message: "Name is required",
      });
    } else {
      let updateStatement = {
        name,
        location,
        techStack,
        githubID,
        linkedin,
        stackOverflow,
        previousProjects
      };
      User.findOneAndUpdate(
        { email: req.user.email },
        { $set: updateStatement },
        (err, data) => {
          if (err) {
            return res.status(400).json({
              error: true,
              message: "Something went wrong when updating user",
            });
          } else {
            return res.json({
              success: true,
              message: "Successfully updated User",
            });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      message: "Something went wrong when updating user",
    });
  }
};

const changePassword = async (req, res) => {
  const { password, confirmPassword, oldPassword } = req.body;
  if (
    !password ||
    !oldPassword ||
    !confirmPassword ||
    password === "" ||
    confirmPassword === "" ||
    oldPassword === ""
  ) {
    return res.status(400).json({
      error: true,
      message: "Password, confirm password and old password is required",
    });
  } else if (password !== confirmPassword) {
    return res.status(400).json({
      error: true,
      message: "Password and confirm password should be same",
    });
  } else {
    const user = await User.findOne({ _id: req.user._id }, { password: 1 });
    bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: true,
          message: "Something went wrong when changing password.",
        });
      } else if (!isMatch) {
        return res.json({
          error: true,
          message: "Please enter correct old password",
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              error: true,
              message: "Something went wrong when changing password.",
            });
          } else {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                console.log(err);
                return res.status(400).json({
                  error: true,
                  message: "Something went wrong when changing password.",
                });
              } else {
                User.findOneAndUpdate(
                  { _id: req.user._id },
                  { $set: { password: hash } },
                  function (err, data) {
                    if (err) {
                      console.log(err);
                      return res.status(400).json({
                        error: true,
                        message: "Something went wrong when changing password.",
                      });
                    } else {
                      return res.send({
                        success: true,
                        message: "Successfully changed password",
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  }
};

module.exports = {
  currentUser,
  loginUser,
  registerUser,
  updateUserProfile,
  changePassword,
};