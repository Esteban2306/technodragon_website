import { Prisma } from "@prisma/client";

export type PrismaProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true;
    variants: {
      include: {
        attributes: true;
      };
    };
  };
}>;