/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
import { seedGrammarTopics } from './seeds/grammar-topics.seed';
import { seedUsers } from './seeds/users.seed';
import { seedWords } from './seeds/words.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  await seedGrammarTopics();
  await seedWords();
  await seedUsers();

  console.log('Database seeding completed.');
}

main()
  .catch((e) => {
    console.error('Seeding failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
