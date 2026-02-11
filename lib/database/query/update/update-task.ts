import { DB, db } from "../../db";

export async function updateUserTask(
  listId: string,
  taskId: string,
  editTask: Partial<DB["task"]>,
): Promise<{ updated: boolean }> {
  const now = new Date().toISOString();

  const result = await db
    .updateTable("task")
    .set({ ...editTask, updatedAt: now })
    .where("id", "=", taskId)
    .where("listId", "=", listId)
    .executeTakeFirst();

  const numUpdatedRows = Number(result?.numUpdatedRows ?? 0);

  return { updated: numUpdatedRows > 0 };
}
