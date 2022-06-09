import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import { validateAllOnces } from '../../../utils/common';
import { ToastContainer, toast } from 'react-toastify';
import { dbConnect } from '../../../lib/db-connect';

export default NextAuth({
    providers: [
        CredentialProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials;
                    validateAllOnces({ email, password });
                    // db connection
                    await dbConnect();
                    const user = await User.findOne({ email }).exec();
                    if (!user) {
                        throw new Error('Something went wrong')
                    }
                    const userDoc = user._doc;
                    const isMatched = await bcrypt.compare(password, userDoc.password)
                    if (user && isMatched) {
                        return userDoc;
                    } else {
                        // return null;
                        toast.error(`Invalid Email or Password`)
                        throw new Error(`Invalid Email or Password`)
                    }
                } catch (error) {
                    toast.error(error)
                    throw new Error(error)
                }

            }
        })
    ],
    callbacks: {
        async session({ session, user }) {
            if (user && user.id) {
                session.user.id = user._id;
            }
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user && user.id) {
                token.id = user._id;
            }
            return token;
        }
    }
})