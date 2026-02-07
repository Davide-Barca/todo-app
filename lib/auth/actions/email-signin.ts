"use server";

import { headers } from "next/headers";
import { auth } from "..";

type EmailSignInParams = {
  email: string;
  password: string;
};

export async function emailSignIn({ email, password }: EmailSignInParams) {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
      },
      headers: await headers(),
    });

    return { ok: true, message: "" };
  } catch (error: any) {
    return { ok: false, message: error.message as string };
  }
}
