import { DB, db } from "../../db";

export async function selectAllListsByUserId(userId: string): Promise<DB["list"][]> {
  return await db
    .selectFrom("list")
    .select(["id", "userId", "title", "createdAt", "updatedAt"])
    .where("userId", "=", userId)
    .orderBy("updatedAt", "desc")
    .execute();
}
