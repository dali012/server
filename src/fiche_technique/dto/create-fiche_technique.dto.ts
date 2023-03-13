import { IsNotEmpty, IsNotEmptyObject, IsNumber } from 'class-validator';
import {
  Administratif,
  Finition,
  PAO,
  Presentation,
  Production,
} from 'src/types';

export class CreateFicheTechniqueDto {
  @IsNotEmpty()
  @IsNumber()
  code_client: number;

  @IsNotEmptyObject()
  presentation: Presentation;

  @IsNotEmptyObject()
  pao: PAO;

  @IsNotEmptyObject()
  administratif: Administratif;

  @IsNotEmptyObject()
  production: Production;

  @IsNotEmptyObject()
  finition: Finition;
}
