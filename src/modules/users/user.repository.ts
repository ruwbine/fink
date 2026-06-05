import { RegisterDto } from '../auth/dto';
import { IUser } from './user.entity';

export abstract class UserRepository {
  abstract create(dto: RegisterDto): Promise<IUser>;
  abstract findByEmail(email: string): Promise<IUser | null>;
}
