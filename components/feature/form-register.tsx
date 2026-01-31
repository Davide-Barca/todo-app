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
  fName: z.string().min(1, "First name cannot be empty"),
  lName: z.string().min(1, "Last name cannot be empty"),
  email: z.email("Invalid Email"),
  username: z.string("Username cannot be empty").min(3, "Username must be at least 3 character").max(20, "Username must be at most 20 character"),
  password: z.string("Password cannot be empty").min(8, "Password must be at least 8 character"),
});

// Main Component
export default function RegisterForm({ formId }: LoginFormProps) {
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
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  // Build component
  return (
    <form id={formId || "register-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-5">
          <TextController label={"First Name"} name="fName" form={form} placeholder="John" />
          <TextController label={"Last Name"} name="lName" form={form} placeholder="Red" />
        </div>
        <TextController label={"Username"} name="username" form={form} placeholder="John Red" />
        <TextController label={"Email"} name="email" form={form} placeholder="example@email.com" />
        <TextController label={"Password"} type="password" name="password" form={form} placeholder="Password" />
      </div>
    </form>
  );
}
