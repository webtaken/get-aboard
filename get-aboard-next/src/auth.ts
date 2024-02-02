import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

// These two values should be a bit less than actual token lifetimes
// 6 days
const BACKEND_ACCESS_TOKEN_LIFETIME = 6 * 24 * 60 * 60;
// 29 days
const BACKEND_REFRESH_TOKEN_LIFETIME = 29 * 24 * 60 * 60;

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_PROVIDERS = ["google", "credentials"];

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // JSON web tokens as session strategy
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
        if (account.provider == "google") {
          try {
            const response = await axios({
              method: "post",
              url: `${process.env.NEXTAUTH_BACKEND_URL}/api/auth/google/`,
              data: {
                access_token: account["access_token"],
                id_token: account["id_token"],
              },
            });
            account["django_data"] = response.data;
            return true;
          } catch (error) {
            return false;
          }
        }
      }
      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        // eslint-disable-next-line
        // @ts-ignore
        token.django_data = { ...account.django_data };
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }

      // Refresh the backend token if necessary
      // eslint-disable-next-line
      // @ts-ignore
      if (getCurrentEpochTime() > token["ref"]) {
        const response = await axios({
          method: "post",
          url: `${process.env.NEXTAUTH_BACKEND_URL}/api/auth/token/refresh/`,
          data: {
            // eslint-disable-next-line
            // @ts-ignore
            refresh: token.django_data["refresh"],
          },
        });
        // eslint-disable-next-line
        // @ts-ignore
        token.django_data["access"] = response.data.access;
        // eslint-disable-next-line
        // @ts-ignore
        // token.django_data["refresh"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    async session({ token, session }) {
      if (token?.django_data) {
        // eslint-disable-next-line
        // @ts-ignore
        session.django_data = token.django_data;
      }
      return session;
    },
  },
};
