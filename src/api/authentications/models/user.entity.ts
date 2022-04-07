import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  public id!: number;

  @Expose()
  @Column({ type: 'varchar', length: 80, unique: true })
  public email: string;

  @Expose()
  @Column({ type: 'varchar', length: 120 })
  public fullname: string;

  @Column({ type: 'varchar' })
  public password: string;
}
