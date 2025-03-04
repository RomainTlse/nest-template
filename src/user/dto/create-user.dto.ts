import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Profil } from '../../profil/entities/profil.entity';

export class CreateUserDto {
  @ApiProperty({
    description: "Mail de l'utilisateur",
    example: 'john.doe@mail.fr',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly mail: string;

  @ApiProperty({
    description: "Username de l'utilisateur",
    example: 'john.doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: "Nom de l'utilisateur", example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ description: "Prénom de l'utilisateur", example: 'John' })
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ description: "Mot de passe de l'utilisateur" })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: "Icone de l'utilisateur" })
  @IsString()
  @IsOptional()
  readonly icon?: string;

  @ApiProperty({ description: "Profil de l'utilisateur" })
  @IsInt()
  @IsNotEmpty()
  readonly profil: Profil;
}
