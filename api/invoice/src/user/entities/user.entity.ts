import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { InvoiceEntity } from 'src/invoice/entities/invoice.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'date' })
  dob: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'varchar', length: 100 })
  hash: string;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.user)
  @JoinColumn({ name: 'user_id' })
  invoices: InvoiceEntity[];

  toOmitted() {
    const { hash, deleted_at, ...omit } = this;
    return omit;
  }
}
