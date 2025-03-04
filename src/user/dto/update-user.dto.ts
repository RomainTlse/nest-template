import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Profil } from '../../profil/entities/profil.entity';

export class UpdateUserDto {
  @ApiProperty({
    description: "Mail de l'utilisateur",
    example: 'john.doe@mail.fr',
  })
  @IsEmail()
  @IsOptional()
  readonly mail: string;

  @ApiProperty({
    description: "Username de l'utilisateur",
    example: 'john.doe',
  })
  @IsString()
  @IsOptional()
  readonly username: string;

  @ApiProperty({ description: "Nom de l'utilisateur", example: 'Doe' })
  @IsString()
  @IsOptional()
  readonly lastname: string;

  @ApiProperty({ description: "Prénom de l'utilisateur", example: 'John' })
  @IsString()
  @IsOptional()
  readonly firstname?: string;

  @ApiProperty({ description: "Mot de passe de l'utilisateur" })
  @IsString()
  @IsOptional()
  readonly password?: string;

  @ApiProperty({ description: "Icone de l'utilisateur" })
  @IsString()
  @IsOptional()
  readonly icon?: string;

  @ApiProperty({ description: "Profil de l'utilisateur" })
  @IsInt()
  @IsOptional()
  readonly profil?: Profil;
}
