import { db } from "../../db";
import { ListRow } from "../../types/list";

export async function selectAllListsByUserId(userId: string): Promise<ListRow[]> {
  return db
    .selectFrom("list")
    .select(["id", "userId", "title", "createdAt", "updatedAt"])
    .where("userId", "=", userId)
    .orderBy("updatedAt", "desc")
    .execute();
}
