import { sign, verify } from "jsonwebtoken";
import { User } from "../interface/user";
import bcrypt from "bcrypt";
import config from "../config";

import * as userService from "./user";

interface CustomJwtPayload {
  email: string;
  id: string;
}

export const login = async (body: Pick<User, "email" | "password">) => {
  const existingUser = userService.getUserByEmail(body.email);
  if (!existingUser) {
    return null;
  }

  const isvalidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );
  if (!isvalidPassword) {
    return null;
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    permissions: existingUser.permissions,
    role: existingUser.role,
  };

  const s = config.jwt.secret!;
  const accessToken = sign(payload, s, {
    expiresIn: config.jwt.accessExpiration,
  });

  const refreshToken = sign(payload, s, {
    expiresIn: config.jwt.refreshTokenExpiration,
  });
  return { accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
  try {
    const decoded = verify(token, config.jwt.secret!) as CustomJwtPayload;

    const existingUser = await userService.getUserByEmail(
      decoded.email as string
    );

    if (!existingUser) {
      return { error: "Invalid token" };
    }

    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    const newAccessToken = sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.accessExpiration,
    });

    const newRefreshToken = sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.refreshTokenExpiration,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (err) {
    return err;
  }
};
