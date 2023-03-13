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
import { Client } from '@prisma/client';
import { FindOneCodeClient } from 'src/utils/findOneParams';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async createClient(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    createClientDto: CreateClientDto,
  ): Promise<Client> {
    return await this.clientService.createClient(createClientDto);
  }

  @Get()
  async findAllClients(): Promise<Client[]> {
    return this.clientService.findAllClients();
  }

  @Get(':code_client')
  async findOneByCodeClient(@Param() { code_client }: FindOneCodeClient) {
    return await this.clientService.findOneByCodeClient(+code_client);
  }

  @Patch(':code_client')
  async updateClient(
    @Param() { code_client }: FindOneCodeClient,
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return await this.clientService.updateClient(+code_client, updateClientDto);
  }

  @Delete(':code_client')
  async removeClient(
    @Param() { code_client }: FindOneCodeClient,
  ): Promise<Client> {
    return await this.clientService.removeClient(+code_client);
  }
}
