import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from 'src/db/db.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateCommande } from './dto/create-commande';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = await this.prisma.client.create({
      data: createClientDto,
    });
    return newClient;
  }

  async addAdministratif(
    code_client: number,
    data: CreateCommande,
  ): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: {
        code_client,
      },
    });

    client.detail.push(data.detail);

    const updatedClient = await this.prisma.client.update({
      where: {
        code_client,
      },
      data: {
        detail: client.detail,
      },
    });
    return updatedClient;
  }

  async findAll(): Promise<Client[]> {
    return await this.prisma.client.findMany();
  }

  async findOneByCodeClient(code_client: number): Promise<Client> {
    const clientExist = await this.prisma.client.findUnique({
      where: {
        code_client,
      },
    });
    if (!clientExist) {
      throw new HttpException("client dosen't exist", HttpStatus.NOT_FOUND);
    }
    return clientExist;
  }

  async update(
    id_client: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const clientExist = await this.prisma.client.findUnique({
      where: {
        id_client,
      },
    });
    if (!clientExist) {
      throw new HttpException("client dosen't exist", HttpStatus.NOT_FOUND);
    }
    return await this.prisma.client.update({
      where: {
        id_client,
      },
      data: updateClientDto,
    });
  }

  async remove(id_client: string): Promise<Client> {
    const clientExist = await this.prisma.client.findUnique({
      where: {
        id_client,
      },
    });
    if (!clientExist) {
      throw new HttpException("client dosen't exist", HttpStatus.NOT_FOUND);
    }
    return await this.prisma.client.delete({
      where: {
        id_client,
      },
    });
  }

  private exclude<Client, Key extends keyof Client>(
    client: Client,
    keys: Key[],
  ): Omit<Client, Key> {
    for (const key of keys) {
      delete client[key];
    }
    return client;
  }
}
