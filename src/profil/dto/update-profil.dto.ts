import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfilDto {
  @ApiProperty({ description: 'Nom du profil' })
  @IsString()
  @IsOptional()
  readonly name: string;
}
