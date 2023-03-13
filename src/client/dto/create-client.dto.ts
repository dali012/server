import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClientDto {
  @IsNumber()
  @IsNotEmpty()
  code_client: number;
}
