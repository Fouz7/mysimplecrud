import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  no: number;

  @Column()
  nama: string;

  @Column()
  alamat: string;

  @Column()
  kota: string;
}