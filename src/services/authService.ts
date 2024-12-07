const PASSWORD_KEY = "note_password";

const getPasswordFromServer = async () => {
  const response = await fetch('http://localhost:3000/api/password');
  const data = await response.json();
  return data.password;
};

const setPasswordToServer = async (password: string) => {
  await fetch('http://localhost:3000/api/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });
};

export const setPassword = async (password: string): Promise<void> => {
  await setPasswordToServer(password);
  localStorage.setItem(PASSWORD_KEY, password);
};

export const getPassword = async (): Promise<string | null> => {
  const localPassword = localStorage.getItem(PASSWORD_KEY);
  if (localPassword) return localPassword;
  
  return await getPasswordFromServer();
};

export const verifyPassword = async (input: string): Promise<boolean> => {
  const storedPassword = await getPassword();
  return storedPassword === input;
};

export const isPasswordSet = async (): Promise<boolean> => {
  const password = await getPassword();
  return !!password;
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
  if (await verifyPassword(oldPassword)) {
    await setPassword(newPassword);
    return true;
  }
  return false;
};