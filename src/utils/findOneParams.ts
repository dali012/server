import { IsNumberString } from 'class-validator';

export class FindOneCodeClient {
  @IsNumberString()
  code_client: string;
}
