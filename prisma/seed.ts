import { PrismaClient } from 'generated/prisma/client';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
console.log('Seeding database...');
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const userIds: number[] = [];

    const adminUser = await tx.user.create({
      data: {
        email: 'admin@example.com',
        password:
          '$argon2i$v=19$m=16,t=2,p=1$d2JHT1p0MzFJRkpadGF1OQ$rHU9THlttiRFc4R3gQHJBA',
        profilePic: 'https://picsum.photos/200',
      },
    });
    userIds.push(adminUser.id);

    for (let i = 1; i <= 10; i++) {
      const users = await tx.user.create({
        data: {
          email: `user${i}@example.com`,
          password:
            '$argon2i$v=19$m=16,t=2,p=1$d2JHT1p0MzFJRkpadGF1OQ$9oLqW7XIQF7rzk7eeuemWQ',
          profilePic: `https://picsum.photos/id/${i + 100}/200/300`,
        },
      });
      userIds.push(users.id);
    }

    for (let i = 1; i <= 20; i++) {
      await tx.products.create({
        data: {
          name: faker.food.ingredient(),
          price: faker.commerce.price({ min: 0.5, max: 200, dec: 2 }),
          expiration: faker.datatype.boolean(0.2) ? null : faker.date.future(),
          wishlistedBy: {
            connect: faker.helpers.arrayElements(userIds).map((id) => ({ id })),
          },
        },
      });
    }
  });
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
