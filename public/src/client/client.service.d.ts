import { Client } from '@prisma/client';
import { PrismaService } from 'src/db/db.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateCommande } from './dto/create-commande';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createClientDto: CreateClientDto): Promise<Client>;
    addAdministratif(code_client: number, data: CreateCommande): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOneByCodeClient(code_client: number): Promise<Client>;
    update(code_client: number, updateClientDto: UpdateClientDto): Promise<Client>;
    remove(id_client: string): Promise<Client>;
    getClientWitchCodeClient(): Promise<{
        code_client: number;
    }[]>;
    private exclude;
}
