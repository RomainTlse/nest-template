import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfilDto {
  @ApiProperty({ description: 'Nom du profil' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
