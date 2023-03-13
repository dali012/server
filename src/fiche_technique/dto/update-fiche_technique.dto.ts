import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmptyObject, IsOptional } from 'class-validator';
import {
  Administratif,
  Finition,
  PAO,
  Presentation,
  Production,
} from 'src/types';
import { CreateFicheTechniqueDto } from './create-fiche_technique.dto';

export class UpdateFicheTechniqueDto extends PartialType(
  CreateFicheTechniqueDto,
) {
  @IsOptional()
  @IsNotEmptyObject()
  presentation?: Presentation;

  @IsOptional()
  @IsNotEmptyObject()
  pao?: PAO;

  @IsOptional()
  @IsNotEmptyObject()
  administratif?: Administratif;

  @IsOptional()
  @IsNotEmptyObject()
  production?: Production;

  @IsOptional()
  @IsNotEmptyObject()
  finition?: Finition;
}
