"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userData = [
    {
        code_client: 23,
        detail: {
            n_bon_commande: 12,
            Date: '2020-02-22',
            n_commande: 14,
            qte: 500,
            machine: 'test',
            nbr_tirage_tour: 1,
            numerotation: 5,
            format_impression: 'normale',
            nbr_plaque: 3,
            format_papier: 'A5',
            qte_papier_par_couleur: 2,
            type_finition: 'Matte',
        },
    },
];
async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const user = await prisma.client.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id_client}`);
    }
    console.log(`Seeding finished.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map