import { verifyToken } from '../utils/utils.js';

export const isAuth = (req, res, next) => {
  const cookie = req.headers.cookie.split('=');
  if (!cookie) throw new Error('Not Authenticated');
  const verifiedToken = verifyToken(cookie[1]);
  req.user = verifiedToken.user;
  next();
};
