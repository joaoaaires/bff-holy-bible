import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import testamentsData from './data/testament.json';
import booksData from './data/book.json';
import chaptersData from './data/chapter.json';
import versesData from './data/verse.json';
import { Verse } from './interfaces';

const connectionString = `${process.env.DIRECT_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.testament.createMany({
    data: testamentsData.map((testament) => ({
      code: testament.code,
      name: testament.name,
      description: testament.description,
    })),
    skipDuplicates: true,
  });

  await prisma.book.createMany({
    data: booksData.map((book) => ({
      order: book.order,
      name: book.name,
      testamentId: book.testament,
    })),
    skipDuplicates: true,
  });

  await prisma.chapter.createMany({
    data: chaptersData.map((chapter) => ({
      number: chapter.number,
      bookId: chapter.book,
    })),
    skipDuplicates: true,
  });

  const verses = versesData as Verse[];

  await prisma.verse.createMany({
    data: verses.map((verse) => ({
      number: verse.number,
      text: verse.text,
      chapterId: verse.chapter,
    })),
    skipDuplicates: true,
  });

  console.log('Seed concluído!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
