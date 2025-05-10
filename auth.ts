import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';

// Define the User type expected by NextAuth
type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30,
    },
    secret: '19d4b0c699be167400aa733d40ebdb5d',
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' }
            },
            async authorize(credentials) {
                if (credentials == null) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                });

                // Check if user exists and if password matches
                if (user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password);
                    if (isMatch) {
                        // Return the user object with the expected shape
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        } as User; // Cast to `User` type
                    }
                }
                // If user does not exist or password doesn't match, return null
                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {
            // Set the user ID from the token
            session.user.id = token.sub;

            // If there is an update, set the user's name
            if (trigger === 'update') {
                session.user.name = user.name;
            }

            return session;
        }
    }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
