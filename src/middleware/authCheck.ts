import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../controllers/userController';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['TS-REST'];
    if (!sessionToken) {
      return res
        .status(403)
        .json({ message: 'Request forbidden. Please Login' });
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res
        .status(403)
        .json({ message: 'Request forbidden. Please Login' });
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
  }
};
