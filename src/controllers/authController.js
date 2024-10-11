import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { registerUser } from "../services/auth.js";
import User from "../models/user.js";
import Session from "../models/session.js";
import jwt from "jsonwebtoken";

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

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
  return { accessToken, refreshToken };
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(401, "Invalid email or password"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid email or password"));
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    await Session.findOneAndDelete({ userId: user._id });

    const session = new Session({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    await session.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: 200,
      message: "Successfully logged in an user!",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
