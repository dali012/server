import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { FicheTechniqueModule } from './fiche_technique/fiche_technique.module';

@Module({
  imports: [ClientModule, FicheTechniqueModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
