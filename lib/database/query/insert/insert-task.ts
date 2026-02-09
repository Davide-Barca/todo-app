import { DB, db } from "../../db";
import { randomUUID } from "crypto";

export async function insertUserTask(
  userId: string,
  listId: string,
  taskTitle: string,
  taskDescription?: string,
): Promise<DB["task"]> {
  const now = new Date().toISOString();
  const id: string = randomUUID();

  const task = {
    id,
    userId,
    listId,
    title: taskTitle,
    description: taskDescription || null,
    isDone: 0,
    createdAt: now,
    updatedAt: now,
  };

  await db.insertInto("task").values(task).execute();

  return task;
}
