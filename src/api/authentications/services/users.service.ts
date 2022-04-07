import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../models/users.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    return this.repository.findOne(id);
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: { email },
    });
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.fullname = body.fullname;
    user.email = body.email;
    user.password = body.password;
    return this.repository.save(user);
  }
}
