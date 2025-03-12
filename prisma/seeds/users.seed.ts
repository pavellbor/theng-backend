import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('Seeding Users...');
  const hashedPasswordUser = await bcrypt.hash('passwordUser', 10);
  const hashedPasswordAdmin = await bcrypt.hash('passwordAdmin', 10);

  const users = await prisma.user.createMany({
    data: [
      {
        email: 'user@example.com',
        name: 'Test User',
        role: 'USER',
        password: hashedPasswordUser,
      },
      {
        email: 'admin@example.com',
        name: 'Test Admin',
        role: 'ADMIN',
        password: hashedPasswordAdmin,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${users.count} Users`);
}
