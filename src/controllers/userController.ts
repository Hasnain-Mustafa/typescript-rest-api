import { UserModel } from 'models/userShema';

export const getUsers = async () => {
  await UserModel.find();
};

export const getUserByEmail = async (email: string) => {
  await UserModel.findOne({ email });
};

export const getUserBySessionToken = async (sessionToken: string) => {
  await UserModel.findOne({ 'authentication.sessionToken': sessionToken });
};

export const getUserById = async (id: string) => {
  await UserModel.findById(id);
};

export const deleteUser = async (id: string) => {
  await UserModel.findOneAndDelete({ _id: id });
};

export const updateUser = async (id: string, values: Record<string, any>) => {
  await UserModel.findByIdAndUpdate(id, values);
};
