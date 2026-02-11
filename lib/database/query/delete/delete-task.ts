import { DeleteResult } from "kysely";
import { db } from "../../db";

export async function deleteUserTask(taskId: string, userId: string): Promise<{ deleted: boolean }> {
  const result = await db.deleteFrom("task").where("id", "=", taskId).where("userId", "=", userId).executeTakeFirst();

  const numDeletedRows = Number(result?.numDeletedRows ?? 0);

  return { deleted: numDeletedRows > 0 };
}
