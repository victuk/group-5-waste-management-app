export const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
  return regex.test(password);
};

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export function trimText(text: string, length: number = 16) {
  if(text.length >= length) return text.slice(0, length) + "...";
  return text;
}