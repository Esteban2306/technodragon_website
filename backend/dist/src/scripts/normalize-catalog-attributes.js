"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const normalize_attribute_1 = require("../modules/catalog/helpers/normalize-attribute");
async function main() {
    const prisma = new client_1.PrismaClient();
    const items = await prisma.catalogItem.findMany({
        select: { id: true, attributes: true },
    });
    let updated = 0;
    for (const item of items) {
        if (!item.attributes || typeof item.attributes !== 'object')
            continue;
        const raw = item.attributes;
        const normalized = Object.fromEntries(Object.entries(raw).map(([key, values]) => [
            (0, normalize_attribute_1.normalizeAttribute)(key),
            Array.isArray(values)
                ? values.map(normalize_attribute_1.normalizeAttribute)
                : [(0, normalize_attribute_1.normalizeAttribute)(String(values))],
        ]));
        if (JSON.stringify(raw) !== JSON.stringify(normalized)) {
            await prisma.catalogItem.update({
                where: { id: item.id },
                data: { attributes: normalized },
            });
            updated++;
        }
    }
    console.log(`Revisados: ${items.length} | Actualizados: ${updated}`);
    await prisma.$disconnect();
}
main();
//# sourceMappingURL=normalize-catalog-attributes.js.map