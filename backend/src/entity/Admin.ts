import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';

import { Length, IsEmail } from 'class-validator';

import { Status } from './root/enums';

@Entity({ name: 'admins' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'first_name' })
  @Length(1, 150)
  firstName!: string;

  @Column({ name: 'last_name', nullable: true })
  @Length(1, 1000)
  lastName?: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @Length(255)
  password!: string;

  @Column({ name: 'contact_number', nullable: true })
  @Length(20)
  contactNumber?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: Status,
    nullable: true,
  })
  status!: Status;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt!: Date;

  /**
   * DB last update time.
   */
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updatedAt!: Date;

  /**
   * Relations
   */
}
