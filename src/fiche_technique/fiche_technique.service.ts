import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Fiche_Technique } from '@prisma/client';
import { PrismaService } from 'src/db/db.service';
import { CreateFicheTechniqueDto } from './dto/create-fiche_technique.dto';
import { UpdateFicheTechniqueDto } from './dto/update-fiche_technique.dto';

@Injectable()
export class FicheTechniqueService {
  constructor(private readonly prisma: PrismaService) {}

  async createFicheTechnique({
    administratif,
    finition,
    pao,
    presentation,
    production,
    code_client,
  }: CreateFicheTechniqueDto): Promise<Fiche_Technique> {
    try {
      const fiche_technique = await this.prisma.fiche_Technique.create({
        data: {
          code_client,
          presentation: {
            create: presentation,
          },
          production: {
            create: production,
          },
          pao: {
            create: pao,
          },
          finition: {
            create: finition,
          },
          administratif: {
            create: administratif,
          },
          Client: {
            connect: {
              code_client,
            },
          },
        },
      });
      return fiche_technique;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllFicheTechnique(): Promise<Fiche_Technique[]> {
    const ficheTechniques = await this.prisma.fiche_Technique.findMany({
      include: {
        Client: true,
        presentation: true,
        pao: true,
        administratif: true,
        production: true,
        finition: true,
      },
    });
    if (ficheTechniques.length === 0) {
      throw new HttpException(
        'no fiche techniques found',
        HttpStatus.NOT_FOUND,
      );
    }
    return ficheTechniques;
  }

  async findOneByIdFicheTechnique(
    id_fiche_technique: string,
  ): Promise<Fiche_Technique> {
    try {
      return await this.prisma.fiche_Technique.findUniqueOrThrow({
        where: {
          id_fiche_technique,
        },
        include: {
          Client: true,
          presentation: true,
          pao: true,
          administratif: true,
          production: true,
          finition: true,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new HttpException(
          'no fiche technique found',
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.code === 'P2023') {
        throw new HttpException('Malformed ObjectID', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFicheTechnique(
    id_fiche_technique: string,
    {
      administratif,
      finition,
      pao,
      presentation,
      production,
    }: UpdateFicheTechniqueDto,
  ): Promise<Fiche_Technique> {
    try {
      return await this.prisma.fiche_Technique.update({
        where: {
          id_fiche_technique,
        },
        data: {
          presentation: {
            update: presentation,
          },
          pao: {
            update: pao,
          },
          administratif: {
            update: administratif,
          },
          production: {
            update: production,
          },
          finition: {
            update: finition,
          },
        },
        include: {
          Client: true,
          presentation: true,
          pao: true,
          administratif: true,
          production: true,
          finition: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'no fiche technique found',
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.code === 'P2023') {
        throw new HttpException('Malformed ObjectID', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFicheTechnique(
    id_fiche_technique: string,
  ): Promise<Fiche_Technique> {
    try {
      return await this.prisma.fiche_Technique.delete({
        where: {
          id_fiche_technique,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'no fiche technique found',
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.code === 'P2023') {
        throw new HttpException('Malformed ObjectID', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
