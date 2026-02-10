"use server";

import { getAuthenticatedUser } from "@/lib/auth/actions/get-user";
import { DB } from "@/lib/database/db";
import { selectAllListsByUserId } from "@/lib/database/query/select/select-lists";
import { redirect } from "next/navigation";

export async function getUserLists(): Promise<DB["list"][] | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const lists = await selectAllListsByUserId(user.id);

  if (!lists || lists.length === 0) return null;

  return lists;
}
