import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  Index,
} from 'typeorm';
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';
import { Tractor } from './Tractor';
import { Parcel } from './Parcel';

@Entity({ name: 'tractor_parcels' })
export class TractorParcel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @JoinColumn({ name: 'tractor_id' })
  @Column('uuid', { name: 'tractor_id' })
  @Index()
  tractorId!: string;

  @JoinColumn({ name: 'parcel_id' })
  @Column('uuid', { name: 'parcel_id' })
  @Index()
  parcelId!: string;

  @Column('date', { name: 'process_on' })
  @IsDate()
  processOn!: Date;

  @Column()
  @Length(1, 255)
  area?: string;

  @Column({ name: 'geo_location', type: 'geometry' })
  geoLocation!: object;

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

  @ManyToOne(() => Tractor, (tractor: { tractorsParcels: TractorParcel }) => tractor.tractorsParcels, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tractor_id' })
  tractor!: Tractor;

  @ManyToOne(() => Parcel, (parcel: { tractorsParcels: TractorParcel }) => parcel.tractorsParcels, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parcel_id' })
  parcel!: Parcel;
}
