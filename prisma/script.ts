import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phoneNumber: "123456789",
      deliveryAddress: "123 Main Street, City",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
