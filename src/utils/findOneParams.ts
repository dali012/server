import { IsNumberString, IsString } from 'class-validator';

export class FindOneCodeClient {
  @IsNumberString()
  code_client: string;
}

export class FindOneIdFicheTechnique {
  @IsString()
  id_fiche_technique: string;
}
