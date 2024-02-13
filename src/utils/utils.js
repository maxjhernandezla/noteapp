import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/dotenv.js';
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
  const token = jwt.sign({ user }, config.privateKey, {
    expiresIn: '24h',
  });
  return token;
};

const validateEmail = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};

const verifyToken = (token) => {
  const verifiedToken = jwt.verify(
    token,
    process.env.PRIVATE_KEY,
    (error, decoded) => {
      if (error) {
        throw new ExpiredJWT(
          'The token has expired, please generate a new one.'
        );
      }
      return decoded;
    }
  );
  return verifiedToken;
};

export {
  createHash,
  isValidPassword,
  generateToken,
  validateEmail,
  verifyToken,
};
