"use server";

import { getAuthenticatedUser } from "@/feature/auth/actions/get-user";
import { DB } from "@/lib/database/db";
import { updateUserTask, updateUserTaskDone } from "@/lib/database/query/update/update-task";
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

export async function editUserTaskDoneAction(listId: string, taskId: string, isDone: boolean) {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const lists = await updateUserTaskDone(listId, taskId, isDone);

  if (!lists.updated) return null;

  return lists.updated;
}
