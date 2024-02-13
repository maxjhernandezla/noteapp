import * as usersManager from '../dao/managers/users.prisma.manager.js';
import {
  createHash,
  generateToken,
  isValidPassword,
  validateEmail,
} from '../utils/utils.js';
import UserDto from '../dao/dto/users.dto.js';

const signUp = async (user) => {
  if (!user.username || !user.email || !user.password)
    throw new Error('Incomplete credentials');
  const isValidEmail = await validateEmail(user.email);
  if (!isValidEmail) throw new Error('Must provide a valid email');
  const existingUser = await usersManager.getUserByEmail(user.email);
  if (existingUser) throw new Error('User already exists');
  const hashedPassword = createHash(user.password);
  user.password = hashedPassword;
  const result = await usersManager.create(user);
  const userDto = new UserDto(result);
  return userDto;
};

const signIn = async (email, password) => {
  if (!email || !password) throw new Error('Incomplete credentials');
  const isValidEmail = await validateEmail(email);
  if (!isValidEmail) throw new Error('Must provide a valid email');
  const user = await usersManager.getUserByEmail(email);
  if (!user) throw new Error('Incorrect credentials');
  const validatePassword = isValidPassword(user, password);
  if (!validatePassword) throw new Error('Incorrect credentials');
  const userDto = new UserDto(user);
  const token = generateToken(userDto);
  return { token, userDto };
};

const signOut = async () => {};

export { signUp, signIn, signOut };
