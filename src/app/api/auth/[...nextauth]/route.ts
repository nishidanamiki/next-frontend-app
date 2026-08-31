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
        // Laravel APIへのログインリクエスト
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
        );
        console.log("login status:", res.status);

        if (!res.ok) {
          return null;
        }

        // ユーザー情報を取得
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`,
          {
            headers: {
              // ログインリクエストのレスポンスからCookieヘッダーを取得して設定
              Cookie: res.headers.get("set-cookie") || "",
            },
          },
        );

        if (!userRes.ok) {
          return null;
        }

        const user = await userRes.json();

        // ユーザーオブジェクトを返す
        return user;
      },
    }),
  ],
  // 他の設定...
});

export { handler as GET, handler as POST };
