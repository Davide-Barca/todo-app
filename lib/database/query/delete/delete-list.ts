import { db } from "../../db";

export async function deleteUserList(listId: string, userId: string): Promise<{ deleted: boolean }> {
  const listResult = await db.deleteFrom("list").where("id", "=", listId).where("userId", "=", userId).executeTakeFirst();
  const taskResult = await db.deleteFrom("task").where("listId", "=", listId).where("userId", "=", userId).executeTakeFirst();

  const numDeletedRows = Number(listResult?.numDeletedRows ?? 0);

  return { deleted: numDeletedRows > 0 };
}
