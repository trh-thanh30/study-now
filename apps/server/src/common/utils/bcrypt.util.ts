import bcrypt from 'bcryptjs';
const SALT = 10;
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT);
};
const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
export { hashPassword, comparePassword };
