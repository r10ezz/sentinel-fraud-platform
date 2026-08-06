import { registerUser } from "../src/services/auth.service";
import prisma from "../src/lib/prisma";

async function main() {
  await registerUser(
    "Admin",
    "admin@sentinel.com",
    "admin123",
    "ADMIN"
  );

  console.log("✅ Admin user created");
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });