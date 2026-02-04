"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

// Actions
import { emailSignIn } from "@/lib/auth/email-signin";

// Components
import TextController from "../utils/form-text-controller";

// Types

// Custom Types
type LoginFormProps = {
  formId?: string;
};

// Form schema
const formSchema = z.object({
  email: z.email().min(1, "Email cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

// Main Component
export default function LoginForm({ formId }: LoginFormProps) {
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
    const response = await emailSignIn({
      email: data.email,
      password: data.password,
    });

    if (!response) alert("Errore");

    router.push(callbackURL || "/");
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
          link={{ value: "Forgot you password?", href: "/password-reset" }}
        />
      </div>
    </form>
  );
}
