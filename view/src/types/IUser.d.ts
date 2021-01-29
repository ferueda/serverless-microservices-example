export interface IUser {
  email: string;
  uid: string;
  first_name: string;
  last_name: string;
}

export interface IUserData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface IDbUser {
  email: string;
  first_name: string;
  last_name: string;
}

export type AuthedUser = {
  email: string;
  uid: string;
  first_name: string;
  last_name: string;
  authToken: string;
};
