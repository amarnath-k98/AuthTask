import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      status: "error",
      message: "User already exists",
    });
  }
  const newUser = await User.create({ name, email, password });
  const token = generateToken({ id: newUser._id, role: newUser.role });
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({
      status: "error",
      message: "Invalid Credentials",
    });
  }
  const token = await generateToken({ id: user._id, role: user.role });
  res.status(200).json({
    status: "success",
    message: "Login Successfull",
    user,
    token,
  });
};

export const getUser = async (req, res) => {
    const user = await User.findById(req.user.id);
  console.log(user);
  res.status(200).json({
    status: "success",
    message: "User Details fetched successfully",
    user,
  });
};
