import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceEntity } from './entities/invoice.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, createInvoiceDto: CreateInvoiceDto) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }
    const newInvoice = this.invoiceRepository.create(createInvoiceDto);
    newInvoice.user = user;
    return this.invoiceRepository
      .save(newInvoice)
      .then((invoice) => invoice.toOmitted());
  }

  async findAll(userId: string) {
    return this.invoiceRepository
      .find({
        where: { user: { user_id: userId } },
        relations: { user: true, items: true },
      })
      .then((invoices) => invoices.map((invoice) => invoice.toOmitted()));
  }

  async findOne(invoiceId: string) {
    return this.invoiceRepository
      .findOne({
        where: { invoice_id: invoiceId },
        relations: { user: true, items: true },
      })
      .then((invoice) => {
        if (!invoice) {
          throw new NotFoundException("This invoice doesn't exist");
        }
        return invoice.toOmitted();
      });
  }

  async update(invoiceId: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = this.invoiceRepository.create(
      await this.findOne(invoiceId),
    );
    const updatedInvoice = this.invoiceRepository.merge(
      invoice,
      updateInvoiceDto,
    );
    return this.invoiceRepository
      .save(updatedInvoice)
      .then((invoice) => invoice.toOmitted());
  }

  remove(invoiceId: string) {
    return this.invoiceRepository.softDelete(invoiceId);
  }
}
