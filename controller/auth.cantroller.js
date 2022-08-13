const User = require("../model/user.model");
const { getToken } = require("../utils/jwtToken");

const dotenv = require("dotenv");
dotenv.config();

exports.signIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exists.", //Unprocessable Entity.
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      likes: [],
      history: [],
      playlists: [],
      watchlater: [],
    });

    const user = await newUser.save();
    const token = getToken(user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      const token = getToken(user._id);

      return res.status(201).json({
        success: true,
        message: "User Logged in successfully",
        user,
        token,
      });
    }

    res.status(400).json({
        success: false,
        message: "Email does not Exist.", //Unprocessable Entity.
      });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
