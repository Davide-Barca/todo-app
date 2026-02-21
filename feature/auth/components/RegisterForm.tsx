"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { TransitionStartFunction } from "react";

// Components
import TextController from "@/components/form/TextController";
import { emailSignUp } from "@/feature/auth/actions/email-signup";
import { showErrorToast } from "@/lib/toast";

// Types

// Custom Types
type LoginFormProps = {
  formId?: string;
  transitionFn: TransitionStartFunction;
};

// Form schema
const formSchema = z.object({
  fName: z.string().min(1, "First name cannot be empty"),
  lName: z.string().min(1, "Last name cannot be empty"),
  email: z.email().min(1, "Email cannot be empty"),
  username: z.string("Username cannot be empty").min(3, "Username must be at least 3 character").max(20, "Username must be at most 20 character"),
  password: z.string("Password cannot be empty").min(8, "Password must be at least 8 character"),
});

// Main Component
export default function RegisterForm({ formId, transitionFn }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") || "/";

  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  // Define onSubit function
  async function onSubmit(data: z.infer<typeof formSchema>) {
    transitionFn(async () => {
      const response = await emailSignUp({
        name: `${data.fName} ${data.lName}`,
        email: data.email,
        password: data.password,
      });

      if (!response.ok) return showErrorToast("Registration Error!", response.message)

      router.push(callbackURL);
    });
  }

  // Build component
  return (
    <form id={formId || "register-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <TextController label={"First Name"} name="fName" form={form} placeholder="John" required />
          <TextController label={"Last Name"} name="lName" form={form} placeholder="Red" required />
        </div>
        <TextController label={"Username"} name="username" form={form} placeholder="John Red" required />
        <TextController label={"Email"} name="email" form={form} placeholder="example@email.com" required />
        <TextController label={"Password"} type="password" name="password" form={form} placeholder="Password" required />
      </div>
    </form>
  );
}
