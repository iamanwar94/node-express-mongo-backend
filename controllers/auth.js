const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log(
      "node => register request body",
      username,
      email,
      phone,
      password
    );
    if (!username || username.length < 3) {
      return res.status(400).send("Bad Request: provide valid username");
    }
    if (!email) {
      return res.status(400).send("Bad Request: provide valid email");
    }
    if (!phone) {
      return res.status(400).send("Bad Request: provide valid phone");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).send("user already in use");
    }

    const data = await User.create({
      username,
      email,
      phone,
      password,
    });
    const token = await data.generateToken();
    res.status(201).json({
      message: `user created with the email ${email}`,
      userId: data._id.toString(),
      token,
    });
  } catch (error) {
    // res.status(500).json({ message: "internal server error", error });
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("node => login email password", email, password);
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ message: "user with provided email does not exist" });
    }
    const user = await bcrypt.compare(password, userExist.password);

    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = await userExist.generateToken();

    res.status(200).json({
      message: `login successfull`,
      userId: userExist._id.toString(),
      email,
      username: userExist.username,
      phone: userExist.phone,
      token,
    });
  } catch (error) {
    // res.status(500).json({ message: "internal server error", error });
    next(error);
  }
};

module.exports = { register, login };
