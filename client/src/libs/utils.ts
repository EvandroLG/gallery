export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isPasswordValid = (value: string) => value && value.length >= 6;
