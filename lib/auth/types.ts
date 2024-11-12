export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  gender: Gender;
  avatar: string;
  bio: string;
}

export interface UserStateType {
  access_token: string | null;
  user: User | null;
}

// params
export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  fullname: string;
  username: string;
  email: string;
  password: string;
  gender: Gender;
}

export type UserAuthRes = UserStateType;
export enum Gender {
  Male = "Male",
  Female = "Female",
}
