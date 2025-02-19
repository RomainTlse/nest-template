import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfilDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
