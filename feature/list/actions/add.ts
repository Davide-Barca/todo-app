"use server";

import { getAuthenticatedUser } from "@/feature/auth/actions/get-user";
import { DB } from "@/lib/database/db";
import { insertUserList } from "@/lib/database/query/insert/insert-list";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addUserList(title: string): Promise<DB["list"] | null> {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/signin");

  const lists = await insertUserList(user.id, title);

  if (!lists) return null;

  revalidatePath("/");

  return lists;
}
