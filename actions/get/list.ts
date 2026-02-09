"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { DB } from "@/lib/database/db";
import { selectUserListWithTasksById } from "@/lib/database/query/select/select-list";
import { redirect } from "next/navigation";

export async function getListById() {}

export async function getListByTitle() {}

export async function getListDataById(listId: string): Promise<{ list: DB["list"]; tasks: DB["task"][] } | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin?error=not_authenticated");

  if (!listId || listId.trim() === "") {
    redirect("/signin?error=invalid_list_id");
  }

  const data = await selectUserListWithTasksById(listId, user.id);

  if (!data) {
    return null;
  }

  return data;
}
