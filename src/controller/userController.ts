import { Request, Response } from 'express';
import { userModel } from '../model/userModel.js';
import { generateResponse } from '../utils/response.js';
import { HTTP_BAD_REQUEST } from '../utils/httpStatusCodes.js';

export const ResponseJsonType = {};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error: unknown) {
    res.status(500).json({
      messsage: (error as Error).message,
      status: 500,
      success: false,
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password_hash, profile_pic } = req.body;

  try {
    if (!name || !email || !password_hash) {
      res.status(HTTP_BAD_REQUEST).json(
        generateResponse({
          message: 'Send Reqest Properly',
          statusCode: HTTP_BAD_REQUEST,
          success: 'OK',
        })
      );
    }
  } catch (error: unknown) {}
};
