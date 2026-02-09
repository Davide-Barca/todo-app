import { DB, db } from "../../db";

export async function selectUserListTasks(listId: string, userId: string): Promise<DB["task"][]> {
  return await db
    .selectFrom("task")
    .select(["id", "listId", "userId", "title", "description", "isDone", "createdAt", "updatedAt"])
    .where("listId", "=", listId)
    .where("userId", "=", userId)
    .orderBy("createdAt", "asc")
    .execute();
}
