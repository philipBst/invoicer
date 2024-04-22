import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { InvoiceItemEntity } from './invoice-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('invoice')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  invoice_id: string;

  @Column({ type: 'varchar', length: 100 })
  street_address: string;

  @Column({ type: 'varchar', length: 45 })
  city: string;

  @Column({ type: 'varchar', length: 10 })
  postal_code: string;

  @Column({ type: 'varchar', length: 60 })
  country: string;

  @Column({ type: 'varchar', length: 100 })
  client_name: string;

  @Column({ type: 'varchar', length: 100 })
  client_email: string;

  @Column({ type: 'varchar', length: 100 })
  client_street_address: string;

  @Column({ type: 'varchar', length: 45 })
  client_city: string;

  @Column({ type: 'varchar', length: 10 })
  client_postal_code: string;

  @Column({ type: 'varchar', length: 60 })
  client_country: string;

  @Column({ type: 'date' })
  issue_date: Date;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column({
    type: 'enum',
    enum: ['draft', 'pending', 'paid', 'canceled'],
    default: 'draft',
  })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.invoices)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;
  user_id?: string;

  @OneToMany(() => InvoiceItemEntity, (item) => item.invoice, { cascade: true })
  @JoinColumn({ name: 'invoice_id' })
  items: InvoiceItemEntity[];

  toOmitted() {
    const { user, deleted_at, ...omitted } = this;
    if (omitted?.user_id) omitted.user_id = user.user_id;
    return omitted;
  }
}
