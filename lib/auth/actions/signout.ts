import { headers } from "next/headers";
import { auth } from ".";

export async function SignOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
