import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import { todo } from 'node:test';
import { object } from 'zod';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
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

            session.user.role = token.role;
            session.user.name = token.name;

            console.log(token)

            // If there is an update, set the user's name
            if (trigger === 'update') {
                session.user.name = user.name;
            }

            return session;
        },
        async jwt({token, user, trigger, session}: any) {
            // Assign user fields to the token

            if(user) {
                token.id = user.id
                token.role = user.role
                // If user has no name use the email
                if(user.name === 'No_Name'){
                    token.name = user.email!.split('@')[0];

                    //Update the DB to reflec the token name
                    await prisma.user.update({
                        where: {id : user.id},
                        data:{name:user.name}
                    })
                }

                if(trigger === 'signIn' || trigger === 'signUp'){
                    const cookieObject = await cookies();
                    const sessionCartId = cookieObject.get('sessionCartId')?.value;

                    if(sessionCartId){
                        const sessionCart = await prisma.cart.findFirst({
                            where: {sessionCartId}
                        });

                    if(sessionCart){
                        //Delete current user cart
                        await prisma.cart.deleteMany({
                            where : {userId: user.id}
                        })

                        await prisma.cart.update({
                            where: {id: sessionCart.id},
                            data: {userId:user.id}
                        })
                    }

                    }
                } 


            }

            //Handle Session updates

            if(session?.user.name && trigger === 'update'){
                token.name = session.user.name
            }
            return token
        },

        authorized({request,auth} : any){

            //Create an array of regex patterns of paths we want to protect
            const protectedPaths = [
                /\/shipping-address/,
                /\/payment-method/,
                /\/place-order/,
                /\/profile/,
                /\/user\/(.*)/,
                /\/order\/(.*)/,
                /\/admin/,
            ];

            //Get pathname from req url obj
            const {pathname} = request.nextUrl;

            //Check if user is not authenticated and accessing a protected path

            if(!auth && protectedPaths.some((p)=>p.test(pathname))) return false
            //check for session cart cookie
            if(!request.cookies.get('sessionCartId')){
                //Generate session card id cookie
                const sessionCartId = crypto.randomUUID();
                // Clone the req headers
                const newRequestHeaders = new Headers(request.headers);

                //Create new res and add the new headers

                const response = NextResponse.next({
                    request: {
                        headers: newRequestHeaders
                    }
                });

                //Set newly generated sessionCartId in the response cookies

                response.cookies.set('sessionCartId', sessionCartId);
                return response;
            } else {
                return true;
            }
        }
    }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
