import { DB, db } from "@/lib/database/db";
import { TableExpressionOrList } from "kysely";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const table = req.nextUrl.searchParams.get("table");

  if (!table) return Response.json("Bad request. ?table= is required!", { status: 400 });

  const users = await db
    .selectFrom(table as TableExpressionOrList<DB, never>)
    .selectAll()
    .execute();

  return Response.json(users);
}
