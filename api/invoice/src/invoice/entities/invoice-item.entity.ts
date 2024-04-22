import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('invoice_item')
export class InvoiceItemEntity {
  @PrimaryGeneratedColumn('uuid')
  item_id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rate: number;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.items)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'invoice_id' })
  invoice: InvoiceEntity;
}
