"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { deleteUserList } from "@/lib/database/query/delete/delete-list";
import { redirect } from "next/navigation";

export async function deleteUserListAction(listId: string): Promise<boolean | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const task = await deleteUserList(listId, user.id);

  if (!task.deleted) return null;

  return task.deleted;
}
