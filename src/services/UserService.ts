import { User, UserData } from "definitions";
import { instances } from "./BaseService";
import { AxiosError, AxiosResponse } from "axios";
import { config } from "process";

const { baseApiInstance } = instances;

const USERS_URL = "users";

const getUserById = async (id: number): Promise<User> => {
    return await baseApiInstance.get(`${USERS_URL}/${id.toString()}`)
      .then(res => res.data);
};

export type FilterUserResponse = {
  users: UserData[],
  total: number,
  skip: number,
  limit: number,
}

const getUserByEmail = async (email: string): Promise<UserData[]> => {
    return await baseApiInstance.get(`${USERS_URL}/filter?key=email&value=${email}`)
      .then((res: AxiosResponse<FilterUserResponse>)=> res.data.users);
};

type PostUserData = {
  username: string,
  password: string,
  expiresInMins?: number
}

type PostUserResponse = {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string
}

const loginUser = async (data: PostUserData) => {
  const config = {headers: { 'Content-Type': 'application/json' }}
  return await baseApiInstance.post("auth/login", JSON.stringify(data), config).then(res => res.data)
}

export const UserService = {
  getUserById,
  loginUser,
  getUserByEmail,
};

// atuny0@sohu.com
// 9uQFF1Lh
