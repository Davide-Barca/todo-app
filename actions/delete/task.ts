"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { deleteUserTask } from "@/lib/database/query/delete/delete-task";
import { redirect } from "next/navigation";

export async function deleteUserTaskAction(taskId: string): Promise<boolean | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const task = await deleteUserTask(taskId, user.id);

  if (!task.deleted) return null;

  return task.deleted;
}
