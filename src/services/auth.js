import User from "../models/user.js";

export const registerUser = async ({ name, email, password }) => {
  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();
  return newUser;
};
