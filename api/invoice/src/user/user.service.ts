import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { jwtConstants } from 'src/constants/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.exists(createUserDto);
    if (userAlreadyExists) {
      return Promise.reject('User already exists');
    }
    const newUser = this.userRepository.create(createUserDto);
    newUser.hash = await bcrypt.hash(
      createUserDto.password,
      jwtConstants.saltRounds,
    );
    return this.userRepository.save(newUser).then((user) => user.toOmitted());
  }

  async exists(userDto: CreateUserDto) {
    return this.userRepository.exists({
      where: [{ username: userDto.username }, { email: userDto.email }],
    });
  }

  async findAll() {
    return this.userRepository
      .find()
      .then((users) => users.map((user) => user.toOmitted()));
  }

  async findOne(userId: string) {
    return this.userRepository.findOne({
      where: { user_id: userId },
    });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
