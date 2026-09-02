import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

        // ① LaravelからCSRF Cookieを取得
        const csrfRes = await fetch(`${baseURL}/sanctum/csrf-cookie`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Origin: "http://localhost:3000",
          },
        });

        const setCookies = csrfRes.headers.getSetCookie();

        const cookieHeader = setCookies
          .map((cookie) => cookie.split(";")[0])
          .join("; ");

        const xsrfCookie = setCookies.find((cookie) =>
          cookie.startsWith("XSRF-TOKEN="),
        );

        const xsrfToken = xsrfCookie
          ? decodeURIComponent(xsrfCookie.split(";")[0].split("=")[1])
          : "";

        // Laravel APIへのログインリクエスト
        const res = await fetch(`${baseURL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "http://localhost:3000",

            // ①でもらったCookieを送る
            Cookie: cookieHeader,

            // CSRFトークンも送る
            "X-XSRF-TOKEN": xsrfToken,
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (!res.ok) {
          return null;
        }

        // ログイン後のCookieを取得
        const loginSetCookies = res.headers.getSetCookie();

        const loginCookieHeader =
          loginSetCookies.length > 0
            ? loginSetCookies.map((cookie) => cookie.split(";")[0]).join("; ")
            : cookieHeader;

        // ② ユーザー情報を取得
        const userRes = await fetch(`${baseURL}/api/user`, {
          headers: {
            // ログインリクエストのレスポンスからCookieヘッダーを取得して設定
            Accept: "application/json",
            Origin: "http://localhost:3000",
            Cookie: loginCookieHeader,
          },
        });

        if (!userRes.ok) {
          return null;
        }

        const user = await userRes.json();

        // ユーザーオブジェクトを返す
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
