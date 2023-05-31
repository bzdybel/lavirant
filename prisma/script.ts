import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.customer.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phoneNumber: "123456789",
      deliveryAddress: "123 Main Street, City",
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
