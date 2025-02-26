import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profil {
  @ApiProperty({
    description: "L'ID du profils",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nom du profil',
  })
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.profil)
  users: User[];
}
