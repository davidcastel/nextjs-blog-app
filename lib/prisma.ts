// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismicClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismicClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
