import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authentication {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  token: string;
}
