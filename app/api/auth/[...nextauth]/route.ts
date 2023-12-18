import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOLE_CLIENT_ID!,
      clientSecret: process.env.GOOLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
