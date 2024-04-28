import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await hash('test', 12);
    const user = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        update: {},
        create: {
            email: 'test@test.com',
            name: 'Test User',
            password
        }
    });

    const foodItems = [
        { name: 'almonds', expirationTime: 180 },
        { name: 'apple', expirationTime: 30 },
        { name: 'asparagus', expirationTime: 4 },
        { name: 'avocado', expirationTime: 4 },
        { name: 'banana', expirationTime: 7 },
        { name: 'beef', expirationTime: 3 },
        { name: 'blueberries', expirationTime: 5 },
        { name: 'bread', expirationTime: 7 },
        { name: 'broccoli', expirationTime: 15 },
        { name: 'carrots', expirationTime: 30 },
        { name: 'cashews', expirationTime: 180 },
        { name: 'cheese', expirationTime: 10 },
        { name: 'chicken', expirationTime: 2 },
        { name: 'chocolate', expirationTime: 365 },
        { name: 'cucumber', expirationTime: 7 },
        { name: 'eggs', expirationTime: 21 },
        { name: 'fish', expirationTime: 2 },
        { name: 'grapes', expirationTime: 7 },
        { name: 'lettuce', expirationTime: 5 },
        { name: 'milk', expirationTime: 7 },
        { name: 'onions', expirationTime: 60 },
        { name: 'oranges', expirationTime: 30 },
        { name: 'peaches', expirationTime: 3 },
        { name: 'peanut butter', expirationTime: 180 },
        { name: 'pears', expirationTime: 10 },
        { name: 'pork', expirationTime: 5 },
        { name: 'potatoes', expirationTime: 80 },
        { name: 'rice', expirationTime: 180 },
        { name: 'salmon', expirationTime: 2 },
        { name: 'spinach', expirationTime: 5 },
        { name: 'strawberries', expirationTime: 7 },
        { name: 'tomatoes', expirationTime: 7 },
        { name: 'turkey', expirationTime: 3 },
        { name: 'watermelon', expirationTime: 14 },
        { name: 'yogurt', expirationTime: 14 },
        { name: 'zucchini', expirationTime: 5 }
    ];

    // Upsert all food items in a single transaction
    await prisma.$transaction(
        foodItems.map(item => prisma.expiration.upsert({
            where: { name: item.name },
            update: { expirationTime: item.expirationTime },
            create: {
                name: item.name,
                expirationTime: item.expirationTime
            }
        }))
    );
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
