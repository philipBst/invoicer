import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateInvoiceItemDto } from './create-invoice-item.dto';
import { Type } from 'class-transformer';

export class CreateInvoiceDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  street_address: string;

  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  city: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  country: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  client_name: string;

  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  client_email: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  client_street_address: string;

  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  client_city: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  client_postal_code: string;

  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  client_country: string;

  @IsDateString()
  @IsNotEmpty()
  issue_date: Date;

  @IsDateString()
  @IsNotEmpty()
  due_date: Date;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  description: string;

  @IsArray()
  @Type(() => CreateInvoiceItemDto)
  @ValidateNested({ each: true })
  items: CreateInvoiceItemDto[];
}
