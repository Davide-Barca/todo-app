import { headers } from "next/headers";
import { auth } from "..";

export async function getAuthenticatedUser() {
  const response = await auth.api.getSession({
    headers: await headers(),
  });

  if (!response) return null;

  return response.user;
}
