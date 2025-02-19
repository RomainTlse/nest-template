import { IsOptional, IsString } from 'class-validator';

export class UpdateProfilDto {
  @IsString()
  @IsOptional()
  readonly name: string;
}
