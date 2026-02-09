"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { DB } from "@/lib/database/db";
import { insertUserTask } from "@/lib/database/query/insert/insert-task";
import { redirect } from "next/navigation";

export async function addUserTask(listId: string, title: string, description?: string): Promise<DB["task"] | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const lists = await insertUserTask(user.id, listId, title, description);

  if (!lists) return null;

  return lists;
}
