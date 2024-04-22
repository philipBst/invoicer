import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller(':user_id/invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(
    @Param('user_id') userId: string,
    @Body() createInvoiceDto: CreateInvoiceDto,
  ) {
    return this.invoiceService.create(userId, createInvoiceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Param('user_id') userId: string) {
    return this.invoiceService.findAll(userId);
  }

  @Get(':invoice_id')
  @UseGuards(AuthGuard)
  findOne(@Param('invoice_id') invoiceId: string) {
    return this.invoiceService.findOne(invoiceId);
  }

  @Patch(':invoice_id')
  @UseGuards(AuthGuard)
  update(
    @Param('invoice_id') invoiceId: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoiceService.update(invoiceId, updateInvoiceDto);
  }

  @Delete(':invoice_id')
  @UseGuards(AuthGuard)
  remove(@Param('invoice_id') invoiceId: string) {
    return this.invoiceService.remove(invoiceId);
  }
}
