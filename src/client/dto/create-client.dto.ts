import { Detail } from '@prisma/client';

export class CreateClientDto {
  code_client: number;
  detail: Detail;
}
