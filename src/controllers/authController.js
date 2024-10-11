import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { registerUser } from "../services/auth.js";
import User from "../models/user.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 201,
      message: "Successfully registered a user!",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
