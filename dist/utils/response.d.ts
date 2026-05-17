import { HTTPResponseStatusType } from './httpStatusCodes.js';
type generateResponseType = {
    statusCode: HTTPResponseStatusType;
    message: string;
    success: string | boolean;
    data?: unknown;
};
export declare const generateResponse: (params: generateResponseType) => {
    data: unknown;
    message: string;
    status: HTTPResponseStatusType;
    success: string | boolean;
};
export {};
//# sourceMappingURL=response.d.ts.map