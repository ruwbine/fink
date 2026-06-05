import { IUser } from '../users';

export type AuthUser = {
  accessToken: string;
  refreshToken: string;
  user: SafeUser;
};

export type SafeUser = Pick<IUser, 'id' | 'email' | 'username'>;
