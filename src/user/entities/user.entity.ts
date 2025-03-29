// src/user/user.entity.ts
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profil } from '../../profil/entities/profil.entity';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';

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
  email: string;

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
  @Column({ nullable: true })
  icon: string;

  @ApiProperty({
    description: 'Token de reinitialisation du mot de passe',
  })
  @Column({ nullable: true })
  resetToken: string;

  @ApiProperty({
    description:
      "Temps d'expiration du token de reinitialisation du mot de passe",
  })
  @Column({ nullable: true })
  resetTokenExpiry: Date;

  @ApiProperty({
    description: "Profil de l'utilisateur",
  })
  @ManyToOne(() => Profil, (profil) => profil.users)
  @JoinColumn({ name: 'profilId' })
  profil: Profil;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
