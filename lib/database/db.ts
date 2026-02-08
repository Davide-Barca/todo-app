import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";

export interface DB {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: number;
    image: string | null;
    createdAt: string; // o Date, dipende da come scrivi/leggi
    updatedAt: string;
  };

  session: {
    id: string;
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string;
  };

  account: {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: string | null;
    refreshTokenExpiresAt: string | null;
    scope: string | null;
    password: string | null;
    createdAt: string;
    updatedAt: string;
  };

  verification: {
    id: string;
    identifier: string;
    value: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
  };

  list: {
    id: string;
    userId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  };

  task: {
    id: string;
    listId: string;
    userId: string;
    title: string;
    description: string | null;
    isDone: number;
    createdAt: string;
    updatedAt: string;
  };
}

function createDb() {
  const sqliteFile = process.env.DATABASE_URL ?? "sqlite.db";

  return new Kysely<DB>({
    dialect: new SqliteDialect({
      database: new Database(sqliteFile),
    }),
  });
}

declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof createDb> | undefined;
}

export const db = globalThis.__db ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalThis.__db = db;
}
