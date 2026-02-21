import { authClient } from "../../../lib/auth/client";

export async function GoogleSignIn(callbackURL?: string) {
  await authClient.signIn.social({
    provider: "google",
    callbackURL,
  });
}
