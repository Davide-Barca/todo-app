"use server";

import { getAuthenticatedUser } from "@/feature/auth/actions/get-user";
import { deleteUserList } from "@/lib/database/query/delete/delete-list";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteUserListAction(listId: string): Promise<boolean | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const task = await deleteUserList(listId, user.id);

  if (!task.deleted) return null;

  revalidatePath("/");

  return task.deleted;
}
