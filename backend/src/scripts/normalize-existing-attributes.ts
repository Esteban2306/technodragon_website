import { PrismaClient } from '@prisma/client';
import { normalizeAttribute } from 'src/modules/catalog/helpers/normalize-attribute';

async function main() {
  const prisma = new PrismaClient();

  const all = await prisma.variantAttribute.findMany();

  for (const attr of all) {
    const normName = normalizeAttribute(attr.name);
    const normValue = normalizeAttribute(attr.value);

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