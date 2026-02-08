"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { insertUserList } from "@/lib/database/query/insert/insert-list";
import { ListRow } from "@/lib/database/types/list";
import { redirect } from "next/navigation";

export async function addUserList(title: string): Promise<ListRow | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const lists = await insertUserList(user.id, title);

  if (!lists) return null;

  return lists;
}
