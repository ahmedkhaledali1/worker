import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        const data = await SignIn(email, password);
        if (!data.token) {
          throw new Error(data);
        }
        return { token: data.token, ...data };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      /* Step 1: update the token based on the user object update token for backend  */
      if (user) {
        token.token = user.token;
        token.user = { ...user };
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object update session for frontend */
      if (token && session.user) {
        session.user.token = token.token;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

const SignIn = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/access-tokens`,
      { email, password }
    );
    return data;
  } catch (resp) {
    return resp.response.data.message;
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
