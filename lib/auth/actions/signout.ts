"use server";

import { headers } from "next/headers";
import { auth } from "../";

export async function signOut() {
  return await auth.api.signOut({
    headers: await headers(),
  });
}
