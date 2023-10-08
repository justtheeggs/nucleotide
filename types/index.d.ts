import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useAuth`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
