import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('int')
  height: number;

  @Column('int')
  weight: number;

  @Column('text')
  gender: string;

  @Column('text')
  residence: string;

  @Column('text')
  photo: string;
}
