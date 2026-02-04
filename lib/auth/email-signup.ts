"use server";

import { auth } from "../auth";

type EmailSignUpParams = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export async function emailSignUp({ name, email, password, image }: EmailSignUpParams) {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        image,
      },
    });

    return { ok: true, message: "" };
  } catch (error: any) {
    return { ok: false, message: error.message as string };
  }
}
