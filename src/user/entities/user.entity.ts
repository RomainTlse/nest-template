// src/user/user.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profil } from '../../profil/entities/profil.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: "L'ID de l'utilisateur",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Mail de l'utilisateur",
    example: 'john.doe@mail.fr',
  })
  @Column()
  mail: string;

  @ApiProperty({
    description: "Username de l'utilisateur",
    example: 'john.doe',
  })
  @Column()
  username: string;

  @ApiProperty({
    description: "Nom de l'utilisateur",
    example: 'Doe',
  })
  @Column()
  lastname: string;

  @ApiProperty({
    description: "Nom de l'utilisateur",
    example: 'John',
  })
  @Column()
  firstname: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
  })
  @Column()
  password: string;

  @ApiProperty({
    description: "Icone de l'utilisateur",
  })
  @Column()
  icon: string;

  @ApiProperty({
    description: "Profil de l'utilisateur",
  })
  @ManyToOne(() => Profil, (profil) => profil.users)
  @JoinColumn({ name: 'profilId' })
  profil: Profil;
}
