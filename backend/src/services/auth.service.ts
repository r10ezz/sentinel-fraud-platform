import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Role } from "@prisma/client";

import { env } from "../config/env";
import { createUser, findUserByEmail } from "./user.service";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: Role = "VIEWER"
) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    name,
    email,
    password: hashedPassword,
    role,
  });
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // Remove password before sending user to frontend
  const { password: _, ...safeUser } = user;

  return {
    token,
    user: safeUser,
  };
}