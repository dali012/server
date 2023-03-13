import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from 'src/db/db.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async createClient({ code_client }: CreateClientDto): Promise<Client> {
    try {
      return await this.prisma.client.create({
        data: {
          code_client,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('client already exist', HttpStatus.FOUND);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllClients(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      include: {
        fiche_technique: {
          include: {
            presentation: true,
            pao: true,
            administratif: true,
            production: true,
            finition: true,
          },
        },
      },
    });
    if (clients.length === 0) {
      throw new HttpException('no clients found', HttpStatus.NOT_FOUND);
    }
    return clients;
  }

  async findOneByCodeClient(code_client: number): Promise<Client> {
    try {
      return await this.prisma.client.findUniqueOrThrow({
        where: {
          code_client,
        },
        include: {
          fiche_technique: {
            include: {
              presentation: true,
              pao: true,
              administratif: true,
              production: true,
              finition: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('no client found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateClient(
    code_client: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    try {
      return await this.prisma.client.update({
        where: {
          code_client,
        },
        data: updateClientDto,
        include: {
          fiche_technique: {
            include: {
              presentation: true,
              pao: true,
              administratif: true,
              production: true,
              finition: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('no client found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeClient(code_client: number): Promise<Client> {
    try {
      return await this.prisma.client.delete({
        where: {
          code_client,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('no client found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
