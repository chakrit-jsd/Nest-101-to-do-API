import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 60 })
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
