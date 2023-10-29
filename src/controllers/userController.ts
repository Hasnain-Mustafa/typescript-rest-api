import express from 'express';
import { UserModel } from '../models/userSchema';

export const getUsers = async () => {
  return await UserModel.find();
};

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'No users found' });
  }
};

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email }).select(
    '+authentication.password +authentication.salt'
  );
};

export const getUserBySessionToken = async (sessionToken: string) => {
  return await UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  });
};

export const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

export const deleteUser = async (id: string) => {
  return await UserModel.findOneAndDelete({ _id: id });
};

export const updateUser = async (id: string, values: Record<string, any>) => {
  return await UserModel.findByIdAndUpdate(id, values);
};

export const createUser = async (values: Record<string, any>) => {
  const newUser = await new UserModel(values).save();
  return newUser.toObject();
};
