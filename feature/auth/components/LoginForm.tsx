"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { TransitionStartFunction } from "react";

// Actions
import { emailSignIn } from "@/lib/auth/actions/email-signin";

// Components
import TextController from "@/components/form/TextController";
import { showErrorToast } from "@/lib/toast";

// Types

// Custom Types
type LoginFormProps = {
  formId?: string;
  transitionFn: TransitionStartFunction;
};

// Form schema
const formSchema = z.object({
  email: z.email().min(1, "Email cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

// Main Component
export default function LoginForm({ formId, transitionFn }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") || "/";

  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define onSubit function
  async function onSubmit(data: z.infer<typeof formSchema>) {
    transitionFn(async () => {
      const response = await emailSignIn({
        email: data.email,
        password: data.password,
      });

      if (!response.ok) return showErrorToast("Login Error!", response.message);

      router.push(callbackURL);
    });
  }

  // Build component
  return (
    <form id={formId || "login-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <TextController label="Email" name="email" form={form} placeholder="john.red@example.com" />
        <TextController
          label="Password"
          type="password"
          name="password"
          form={form}
          placeholder="Password"
          link={{ value: "Forgot you password?", href: "/auth/password-reset" }}
        />
      </div>
    </form>
  );
}
