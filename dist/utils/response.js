export const generateResponse = (params) => {
    const { message, statusCode, success, data } = params;
    return {
        data,
        message,
        status: statusCode,
        success,
    };
};
// const sendSuccess() {
// }
//# sourceMappingURL=response.js.map