import { SafeUser } from '../auth/auth-user.types';
import { IUser } from './user.entity';

export class UserMapper {
  static mapUser(user: IUser): SafeUser {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
