require('dotenv').config();

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export const utils = {
    DATABASE_URL: process.env.DATABASE_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    PORT: process.env.PORT || 8000
}






