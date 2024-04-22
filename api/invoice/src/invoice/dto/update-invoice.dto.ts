import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @IsEnum(['draft', 'pending', 'paid', 'canceled'])
  @IsNotEmpty()
  status: string;
}
