import { PrismaClient } from '@prisma/client';
import { normalizeAttribute } from 'src/modules/catalog/helpers/normalize-attribute';

async function main() {
  const prisma = new PrismaClient();

  const items = await prisma.catalogItem.findMany({
    select: { id: true, attributes: true },
  });

  let updated = 0;

  for (const item of items) {
    if (!item.attributes || typeof item.attributes !== 'object') continue;

    const raw = item.attributes as Record<string, string[]>;

    const normalized = Object.fromEntries(
      Object.entries(raw).map(([key, values]) => [
        normalizeAttribute(key),
        Array.isArray(values)
          ? values.map(normalizeAttribute)
          : [normalizeAttribute(String(values))],
      ]),
    );

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