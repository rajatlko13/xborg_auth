import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  googleId?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  bio?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
