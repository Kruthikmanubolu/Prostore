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

    cart: {
      itemsPrice: {
        needs: {
          itemsPrice: true,
        },
        compute(cart){
          return cart.itemsPrice.toString();
        }
      },

      shippingPrice: {
        needs: {
          shippingPrice: true,
        },
        compute(cart){
          return cart.shippingPrice.toString();
        }
      },

      taxPrice: {
        needs: {
          taxPrice: true,
        },
        compute(cart){
          return cart.taxPrice.toString();
        }
      },

      totalPrice: {
        needs: {
          totalPrice: true,
        },
        compute(cart){
          return cart.totalPrice.toString();
        }
      },
    },

    order: {
      itemsPrice: {
        needs: {
          itemsPrice: true,
        },
        compute(cart){
          return cart.itemsPrice.toString();
        }
      },

      shippingPrice: {
        needs: {
          shippingPrice: true,
        },
        compute(cart){
          return cart.shippingPrice.toString();
        }
      },

      taxPrice: {
        needs: {
          taxPrice: true,
        },
        compute(cart){
          return cart.taxPrice.toString();
        }
      },

      totalPrice: {
        needs: {
          totalPrice: true,
        },
        compute(cart){
          return cart.totalPrice.toString();
        }
      },
    },

    orderItem:{
      price: {
        compute(cart){
          return cart.price.toString();
        }
      }
    }
  },
});