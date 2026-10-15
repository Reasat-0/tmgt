import { Request, Response } from 'express';
import { query } from '../config/db.js';
import { userModel } from '../model/userModel.js';
import { generateResponse, successResponse } from '../utils/generateResponse.js';
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_UNAUTHORIZED,
} from '../utils/httpStatusCodes.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
import { ERROR_CODES } from '../utils/errorCodes.js';
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
    const { email, password } = req.body ?? {};
    // 1. Validate Input - Check if email and password are provided...
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
        throw new AppError(HTTP_BAD_REQUEST, 'Email and password are required', ERROR_CODES.BAD_REQUEST);
    }
    //
    // 2. Checking if user exists with the provided email...
    const user = await userModel.findUserByEmail(email);

    // --- If user doesn't exist, return error message...
    if (!user) {
      throw new AppError(HTTP_UNAUTHORIZED, 'Invalid email or password', ERROR_CODES.INVALID_CREDENTIALS);
    }

    // --- If exists then compare the provided password with the stored hashed password...

    // 3. Compare the provided password with the stored hashed password...
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError(HTTP_UNAUTHORIZED, 'Invalid email or password', ERROR_CODES.INVALID_CREDENTIALS);
    }

    // 4. JWT Token Generation
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Sending token and user info in response
    return res.status(HTTP_OK).json(
      successResponse("Login successful", {
        token,
        user : {
          id: user.id,
          name: user.name,
          email: user.email,
          profile_pic: user.profile_pic,
        },

      })
    );
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Add logout logic here
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
};
