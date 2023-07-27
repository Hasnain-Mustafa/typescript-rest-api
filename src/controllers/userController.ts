import { UserModel } from '../models/userSchema';

export const getUsers = async () => {
  await UserModel.find();
};

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
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
