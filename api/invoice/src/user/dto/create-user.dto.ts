import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  password: string;
}
