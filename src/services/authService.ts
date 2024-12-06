const PASSWORD_KEY = "note_password";

export const setPassword = (password: string): void => {
  localStorage.setItem(PASSWORD_KEY, password);
};

export const getPassword = (): string | null => {
  return localStorage.getItem(PASSWORD_KEY);
};

export const verifyPassword = (input: string): boolean => {
  const storedPassword = getPassword();
  return storedPassword === input;
};

export const isPasswordSet = (): boolean => {
  return !!getPassword();
};

export const changePassword = (oldPassword: string, newPassword: string): boolean => {
  if (verifyPassword(oldPassword)) {
    setPassword(newPassword);
    return true;
  }
  return false;
};