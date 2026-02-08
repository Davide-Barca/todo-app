import { db } from "../../db";
import { randomUUID } from "crypto";
import { ListRow } from "../../types/list";

export async function insertUserList(userId: string, title: string): Promise<ListRow> {
  const now = new Date().toISOString();
  const id = randomUUID();

  const list = { id, userId, title, createdAt: now, updatedAt: now };

  await db.insertInto("list").values(list).execute();

  return list;
}
