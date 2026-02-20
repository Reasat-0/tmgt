import { Request, Response } from 'express';
import { query } from '../config/db.js';
import { userModel } from '../model/userModel.js';
import { generateResponse } from '../utils/response.js';
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_OK,
} from '../utils/httpStatusCodes.js';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    // Add registration logic here
    const isUserExists = await userModel.findUserByEmail(email);
    if (isUserExists) {
      res.status(HTTP_BAD_REQUEST).json(
        generateResponse({
          message: 'User already exists',
          statusCode: HTTP_BAD_REQUEST,
          success: false,
        })
      );
    }
    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save to database
    const newUser = await userModel.createUser({
      name,
      email,
      password_hash: hashedPassword,
      profile_pic: '', // You can handle profile picture upload separately
    });
    res.status(201).json(
      res.status(HTTP_OK).json(
        generateResponse({
          message: 'Registration successful',
          statusCode: HTTP_OK,
          success: true,
          data: {
            ...newUser,
          },
        })
      )
    );
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json(
      generateResponse({
        message: (error as Error).message,
        statusCode: HTTP_INTERNAL_SERVER_ERROR,
        success: false,
      })
    );
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Add login logic here
    res.status(HTTP_CREATED);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Add logout logic here
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
};
