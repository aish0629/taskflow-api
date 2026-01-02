export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;
