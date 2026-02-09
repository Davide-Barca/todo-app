import { DB, db } from "../../db";
import { selectUserListTasks } from "./select-tasks";

export async function selectUserListById(listId: string, userId: string): Promise<DB["list"] | undefined> {
  return db
    .selectFrom("list")
    .select(["id", "userId", "title", "createdAt", "updatedAt"])
    .where("id", "=", listId)
    .where("userId", "=", userId)
    .executeTakeFirst();
}

export async function selectUserListWithTasksById(
  listId: string,
  userId: string,
): Promise<{ list: DB["list"]; tasks: DB["task"][] } | null> {
  const list = await selectUserListById(listId, userId);

  if (!list) return null;

  const tasks = await selectUserListTasks(listId, userId);

  return { list, tasks };
}
