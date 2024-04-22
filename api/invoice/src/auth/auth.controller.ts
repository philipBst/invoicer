import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify')
  verify(@Body() verifyTokenDto: VerifyTokenDto) {
    return this.authService.verify(verifyTokenDto.token);
  }
}
