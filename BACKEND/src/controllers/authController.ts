import { Request, Response } from "express";

import prisma from "../config/prisma";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } =
      req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email
        }
      });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.json({
      message: "User registered",
      user
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Registration failed"
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          email
        }
      });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      "secretkey",
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Login failed"
    });
  }
};