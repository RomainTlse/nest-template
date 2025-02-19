// src/user/user.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profil } from '../../profil/entities/profil.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mail: string;

  @Column()
  username: string;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  password: string;

  @Column()
  icon: string;

  @ManyToOne(() => Profil, (profil) => profil.users)
  @JoinColumn({ name: 'profilId' })
  profil: Profil;
}
