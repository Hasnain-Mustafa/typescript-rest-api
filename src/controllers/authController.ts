import express from 'express';
import { getUserByEmail, createUser } from './userController';
import { authentication, random } from '../helpers/index';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400).json({
        message: 'Please enter email and password',
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "The user doesn't exist" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({ message: 'Incorrect Email/Password' });
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    res.cookie('TS-REST', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400).json({
        message: 'Email, password and username cannot be empty',
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: 'User with the same email already exists',
      });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    console.log(user);
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
