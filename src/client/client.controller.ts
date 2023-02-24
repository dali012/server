import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Client } from '@prisma/client';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateCommande } from './dto/create-commande';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(createClientDto);
  }

  @Post('/add-commande/:code_client')
  async addCommande(
    @Body() createCommande: CreateCommande,
    @Param('code_client') code_client: string,
  ): Promise<Client> {
    return await this.clientService.addAdministratif(
      +code_client,
      createCommande,
    );
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @Get(':code_client')
  async findOne(@Param('code_client') code_client: string): Promise<Client> {
    return await this.clientService.findOneByCodeClient(+code_client);
  }

  @Patch(':id_client')
  async update(
    @Param('id_client') id_client: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return await this.clientService.update(id_client, updateClientDto);
  }

  @Delete(':id_client')
  async remove(@Param('id_client') id_client: string): Promise<Client> {
    return await this.clientService.remove(id_client);
  }
}
