import { DB, db } from "../../db";
import { randomUUID } from "crypto";

export async function insertUserList(userId: string, title: string): Promise<DB["list"]> {
  const now = new Date().toISOString();
  const id = randomUUID();

  const list = { id, userId, title, createdAt: now, updatedAt: now };

  await db.insertInto("list").values(list).execute();

  return list;
}
