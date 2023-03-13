import { Module } from '@nestjs/common';
import { FicheTechniqueService } from './fiche_technique.service';
import { FicheTechniqueController } from './fiche_technique.controller';
import { PrismaService } from 'src/db/db.service';

@Module({
  controllers: [FicheTechniqueController],
  providers: [FicheTechniqueService, PrismaService],
})
export class FicheTechniqueModule {}
