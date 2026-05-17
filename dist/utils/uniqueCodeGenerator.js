import { customAlphabet } from 'nanoid';
export const generateUniqueCode = (prefix, length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generator = customAlphabet(characters, length);
    const uniqueCode = generator();
    return `${prefix}-${uniqueCode}`;
};
//# sourceMappingURL=uniqueCodeGenerator.js.map