import { Client } from '@prisma/client';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateCommande } from './dto/create-commande';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto): Promise<Client>;
    addCommande(createCommande: CreateCommande, code_client: string): Promise<Client>;
    findAll(): Promise<Client[]>;
    findClients(): Promise<{
        code_client: number;
    }[]>;
    findOne(code_client: string): Promise<Client>;
    update(code_client: string, updateClientDto: UpdateClientDto): Promise<Client>;
    remove(id_client: string): Promise<Client>;
}
