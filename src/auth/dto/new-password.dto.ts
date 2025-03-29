import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewPasswordDto {
  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "Token de l'utilisateur",
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
