"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { selectAllListsByUserId } from "@/lib/database/query/select/select-lists";
import { ListRow } from "@/lib/database/types/list";
import { redirect } from "next/navigation";

export async function getAllLists(): Promise<ListRow[] | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const lists = await selectAllListsByUserId(user.id);

  if (!lists || lists.length === 0) return null;

  return lists;
}

export async function getUserLists() {}
