import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { FicheTechniqueService } from './fiche_technique.service';
import { CreateFicheTechniqueDto } from './dto/create-fiche_technique.dto';
import { UpdateFicheTechniqueDto } from './dto/update-fiche_technique.dto';
import { Fiche_Technique } from '@prisma/client';
import { FindOneIdFicheTechnique } from 'src/utils/findOneParams';

@Controller('fiche-technique')
export class FicheTechniqueController {
  constructor(private readonly ficheTechniqueService: FicheTechniqueService) {}

  @Post()
  async createFicheTechnique(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    createFicheTechniqueDto: CreateFicheTechniqueDto,
  ): Promise<Fiche_Technique> {
    return await this.ficheTechniqueService.createFicheTechnique(
      createFicheTechniqueDto,
    );
  }

  @Get()
  async findAllFicheTechnique(): Promise<Fiche_Technique[]> {
    return await this.ficheTechniqueService.findAllFicheTechnique();
  }

  @Get(':id_fiche_technique')
  async findOneByIdFicheTechnique(
    @Param() { id_fiche_technique }: FindOneIdFicheTechnique,
  ): Promise<Fiche_Technique> {
    return await this.ficheTechniqueService.findOneByIdFicheTechnique(
      id_fiche_technique,
    );
  }

  @Patch(':id_fiche_technique')
  async updateFicheTechnique(
    @Param()
    { id_fiche_technique }: FindOneIdFicheTechnique,
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    updateFicheTechniqueDto: UpdateFicheTechniqueDto,
  ): Promise<Fiche_Technique> {
    return await this.ficheTechniqueService.updateFicheTechnique(
      id_fiche_technique,
      updateFicheTechniqueDto,
    );
  }

  @Delete(':id_fiche_technique')
  async removeFicheTechnique(
    @Param() { id_fiche_technique }: FindOneIdFicheTechnique,
  ): Promise<Fiche_Technique> {
    return await this.ficheTechniqueService.removeFicheTechnique(
      id_fiche_technique,
    );
  }
}
