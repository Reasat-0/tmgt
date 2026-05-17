import { userModel } from '../model/userModel.js';
import { generateResponse } from '../utils/response.js';
import { HTTP_BAD_REQUEST } from '../utils/httpStatusCodes.js';
export const ResponseJsonType = {};
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            messsage: error.message,
            status: 500,
            success: false,
        });
    }
};
export const registerUser = async (req, res) => {
    const { name, email, password_hash, profile_pic } = req.body;
    try {
        if (!name || !email || !password_hash) {
            res.status(HTTP_BAD_REQUEST).json(generateResponse({
                message: 'Send Reqest Properly',
                statusCode: HTTP_BAD_REQUEST,
                success: 'OK',
            }));
        }
    }
    catch (error) { }
};
//# sourceMappingURL=userController.js.map