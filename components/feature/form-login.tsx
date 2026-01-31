"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Components
import TextController from "../utils/form-text-controller";

// Types

// Custom Types
type LoginFormProps = {
  formId?: string;
};

// Form schema
const formSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

// Main Component
export default function LoginForm({ formId }: LoginFormProps) {
  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Define onSubit function
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  // Build component
  return (
    <form id={formId || "login-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <TextController label="Username" name="username" form={form} placeholder="John Red" />
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
