import argon2 from 'argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@neoxmeet.local';
  const password = 'ChangeMe123!';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await argon2.hash(password);
    await prisma.user.create({ data: { email, passwordHash, name: 'Admin' } });
    console.log(`Seeded admin user ${email} / ${password}`);
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
