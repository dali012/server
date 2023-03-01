"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let ClientService = class ClientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClientDto) {
        const clientExists = await this.prisma.client.findUnique({
            where: {
                code_client: createClientDto.code_client,
            },
        });
        if (!clientExists) {
            const newClient = await this.prisma.client.create({
                data: createClientDto,
            });
            return newClient;
        }
        throw new common_1.HttpException('client exist', common_1.HttpStatus.FOUND);
    }
    async addAdministratif(code_client, data) {
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
    async findAll() {
        return await this.prisma.client.findMany();
    }
    async findOneByCodeClient(code_client) {
        const clientExist = await this.prisma.client.findUnique({
            where: {
                code_client,
            },
        });
        if (!clientExist) {
            throw new common_1.HttpException("client dosen't exist", common_1.HttpStatus.NOT_FOUND);
        }
        return clientExist;
    }
    async update(code_client, updateClientDto) {
        const clientExist = await this.prisma.client.findUnique({
            where: {
                code_client,
            },
        });
        if (!clientExist) {
            throw new common_1.HttpException("client dosen't exist", common_1.HttpStatus.NOT_FOUND);
        }
        return await this.prisma.client.update({
            where: {
                code_client,
            },
            data: updateClientDto,
        });
    }
    async remove(id_client) {
        const clientExist = await this.prisma.client.findUnique({
            where: {
                id_client,
            },
        });
        if (!clientExist) {
            throw new common_1.HttpException("client dosen't exist", common_1.HttpStatus.NOT_FOUND);
        }
        return await this.prisma.client.delete({
            where: {
                id_client,
            },
        });
    }
    async getClientWitchCodeClient() {
        const clients = await this.prisma.client.findMany({
            select: {
                code_client: true,
            },
            orderBy: {
                code_client: 'asc',
            },
        });
        return clients;
    }
    exclude(client, keys) {
        for (const key of keys) {
            delete client[key];
        }
        return client;
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.PrismaService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map