import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('int')
  height: number;

  @Column('int')
  weight: number;

  @Column()
  gender: string;

  @Column()
  residence: string;

  @Column({ nullable: true })
  photo?: string;
}
