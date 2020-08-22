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

import { TractorParcel } from './TractorParcel';

@Entity({ name: 'parcels' })
export class Parcel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @Length(1, 150)
  name!: string;

  @Column()
  @Length(1, 255)
  culture?: string;

  @Column()
  @Length(1, 255)
  area?: string;

  @Column({ name: 'geo_location', type: 'geometry' })
  geoLocation!: object;

  @Column({
    name: 'status',
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
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

  @OneToMany(() => TractorParcel, (tractorsParcels) => tractorsParcels.parcel)
  tractorsParcels!: TractorParcel[];
}
