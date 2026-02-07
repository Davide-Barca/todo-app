import { authClient } from "../client";

export async function GoogleSignIn(callbackURL?: string) {
  await authClient.signIn.social({
    provider: "google",
    callbackURL,
  });
}
