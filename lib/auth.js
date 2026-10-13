import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("bazardor.db"),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor-secret-key-batch14-2026",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo-github-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo-github-secret",
    },
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
