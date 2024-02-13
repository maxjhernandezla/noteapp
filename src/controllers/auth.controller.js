import * as authService from '../services/auth.service.js';

const signUp = async (req, res) => {
  try {
    const result = await authService.signUp({ ...req.body });
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, userDto } = await authService.signIn(email, password);
    res.cookie('authCookie', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send({ token, user: userDto });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie('authCookie').send({ message: 'Log Out successfull...' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { signIn, logOut, signUp };
