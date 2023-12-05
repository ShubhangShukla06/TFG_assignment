const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");
const { generateToken } = require("../helpers/helper");
const { producerEvent } = require("../rabbitmq/producer");

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userExists = await UserModel.findByPk(email);

    if (userExists) {
      return res.json({
        msg: "User already exists in db",
        error: false,
        code: 200
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    await UserModel.create({
      email,
      username,
      password: hashPassword,
    });

    // call message queue producer
    producerEvent({
        email,
        username
    });

    return res.json({
      msg: "User successfully register",
      error: false,
      code: 200,
    });
  } catch (error) {
    return res.json({
      msg: error.message,
      error: true,
      code: 500,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await UserModel.findOne({
      attributes: ["email", "username", "password"],
      where: { email },
    });

    const isPasswordValid = bcrypt.compareSync(password, userData.password);

    if (!isPasswordValid) {
      return res.json({
        msg: "Invalid Credential",
        error: false,
        code: 200,
      });
    }

    const payload = {
        email,
        username: userData.username,
    }, validity = "1h";

    const token = await generateToken(payload, validity);

    return res.json({
      msg: `Welcome ${userData.username}`,
      token: token,
      error: false,
      code: 200
    });
  } catch (error) {
    return res.json({
      msg: "Something went wrong!",
      error: error.message,
      code: 500,
    });
  }
};
