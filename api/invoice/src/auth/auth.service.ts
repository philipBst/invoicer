import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(loginDto.password, user.hash);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    try {
      const accessToken = await this.jwtService.signAsync({
        user_id: user.user_id,
      });
      return {
        user: user.toOmitted(),
        access_token: accessToken,
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
  }

  async verify(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      return {
        valid: true,
      };
    } catch (error) {
      return {
        valid: false,
      };
    }
  }

  async refresh(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return this.jwtService.signAsync(payload);
  }
}
