import { customAlphabet } from 'nanoid';

export const generateUniqueCode = (
  prefix: string,
  length: number = 8
): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const generator = customAlphabet(characters, length);
  const uniqueCode = generator();
  return `${prefix}-${uniqueCode}`;
};
