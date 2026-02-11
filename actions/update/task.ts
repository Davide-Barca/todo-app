"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { DB } from "@/lib/database/db";
import { updateUserTask } from "@/lib/database/query/update/update-task";
import { redirect } from "next/navigation";

export async function editUserTaskAction(
  listId: string,
  taskId: string,
  editTask: Partial<DB["task"]>,
): Promise<boolean | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const lists = await updateUserTask(listId, taskId, editTask);

  if (!lists.updated) return null;

  return lists.updated;
}
