import bcrypt from 'bcryptjs';
import * as authService from './auth.service.js';
import { generateToken } from '../../utils/auth.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await authService.createUser({ name, email, password });
    const token = generateToken(user.id);

    res.status(201).json({
      status: 'success',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    delete user.password;

    res.status(200).json({
      status: 'success',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.findUserById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
