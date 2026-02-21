
import 'dotenv/config'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

export const db = globalThis.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
