import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: "L'adresse email de l'utilisateur",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
