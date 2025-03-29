import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "L'adresse email de l'utilisateur",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Le mot de passe de l’utilisateur',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
