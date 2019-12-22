export const isObjectEmpty = param => !Object.keys(param).length;
export const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isPasswordValid = value => value && value.length >= 6;
