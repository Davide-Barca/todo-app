"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { DB } from "@/lib/database/db";
import { insertUserList } from "@/lib/database/query/insert/insert-list";
import { redirect } from "next/navigation";

export async function addUserList(title: string): Promise<DB["list"] | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const lists = await insertUserList(user.id, title);

  if (!lists) return null;

  return lists;
}
