import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();
export * from "@prisma/client";

async function main() {}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async () => {
    await db.$disconnect();
    process.exit(1);
  });
