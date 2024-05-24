import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "process";

let connection: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  connection = postgres(process.env.DATABASE_CONNECTION_STRING as string, {
    prepare: false,
  });
} else {
  const globalConnection = global as typeof globalThis & {
    connection: postgres.Sql;
  };

  if (!globalConnection.connection) {
    globalConnection.connection = postgres(
      process.env.DATABASE_CONNECTION_STRING as string,
      {
        prepare: false,
      }
    );
  }

  connection = globalConnection.connection;
}

const db = drizzle(connection, {
  schema,
  logger: env.NODE_ENV === "development",
});

export * from "./schema";
export { db };
