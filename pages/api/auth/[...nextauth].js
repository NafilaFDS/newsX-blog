import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import { validateAllOnces } from '../../../utils/common';
import { ToastContainer, toast } from 'react-toastify';
import { dbConnect } from '../../../lib/db-connect';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials;
                    validateAllOnces({ email, password });
                    await dbConnect();
                    const user = await User.findOne({ email }).exec();
                    if (!user) {
                        throw new Error("Something went wrong");
                    }
                    const userDoc = user._doc;
                    const isMatched = await bcrypt.compare(password, userDoc.password);

                    if (user && isMatched) {
                        delete userDoc.password;
                        return userDoc;
                    } else {
                        throw new Error("Email or Password Incorrect..!");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token && token.id) {
                session.user.id = token.id;
            }
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user && user._id) {
                token.id = user._id;
            }
            return token;
        },
    }
});