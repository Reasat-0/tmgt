import { HTTP_BAD_GATEWAY, HTTP_UNAUTHORIZED, } from '../utils/httpStatusCodes.js';
import { generateResponse } from '../utils/response.js';
import jwt from 'jsonwebtoken';
export const authVefifierMiddleware = (req, res, next) => {
    // 1. Get the token from reqest authorization header.
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(HTTP_UNAUTHORIZED).json(generateResponse({
            message: 'No token provided or header missing',
            statusCode: HTTP_UNAUTHORIZED,
            success: false,
        }));
    }
    // 2. Verify the token
    try {
        const mainToken = authHeader.split(' ')[1]; // as it's prefixed with 'Bearer ' from the client...
        console.log(mainToken);
        const decoded = jwt.verify(mainToken, process.env.JWT_SECRET);
        console.log('----', decoded);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    }
    catch (error) {
        return res.status(HTTP_BAD_GATEWAY).json(generateResponse({
            message: 'Invalid token',
            statusCode: HTTP_BAD_GATEWAY,
            success: false,
        }));
    }
};
//# sourceMappingURL=authMiddleware.js.map