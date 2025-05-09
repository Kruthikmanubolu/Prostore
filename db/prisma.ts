import { PoolConfig, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/lib/generated/prisma';
import ws from 'ws';

// Sets up WebSocket connections
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.NEXT_PUBLIC_DATABASE_URL}`;

// Define the pool configuration instead of creating a Pool instance
const poolConfig: PoolConfig = { connectionString };

// Instantiates the Prisma adapter using the Neon pool configuration
const adapter = new PrismaNeon(poolConfig);

// Extends the PrismaClient
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});