import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserTokenDto {
  @ApiProperty({
    description: 'Token pour la réinitialisation du mot de passe',
  })
  @IsString()
  @IsOptional()
  resetToken: string | null = null;

  @ApiProperty({ description: "Délais d'expiration pour le token" })
  @IsDate()
  @IsOptional()
  resetTokenExpiry: Date | null = null;

  constructor(partial: Partial<UpdateUserTokenDto>) {
    Object.assign(this, partial);
  }
}
