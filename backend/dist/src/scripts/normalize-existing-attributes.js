"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const normalize_attribute_1 = require("../modules/catalog/helpers/normalize-attribute");
async function main() {
    const prisma = new client_1.PrismaClient();
    const all = await prisma.variantAttribute.findMany();
    for (const attr of all) {
        const normName = (0, normalize_attribute_1.normalizeAttribute)(attr.name);
        const normValue = (0, normalize_attribute_1.normalizeAttribute)(attr.value);
        if (normName !== attr.name || normValue !== attr.value) {
            await prisma.variantAttribute.update({
                where: { id: attr.id },
                data: { name: normName, value: normValue },
            });
        }
    }
    console.log(`Normalized ${all.length} attributes`);
    await prisma.$disconnect();
}
main();
//# sourceMappingURL=normalize-existing-attributes.js.map