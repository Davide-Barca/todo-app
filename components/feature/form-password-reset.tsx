"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

// Actions

// Components
import TextController from "../utils/form-text-controller";
import { toast } from "sonner";
import { showInfoToast } from "@/lib/toast";

// Types

// Custom Types
type LoginFormProps = {
  formId?: string;
};

// Form schema
const formSchema = z.object({
  email: z.email().min(1, "Email cannot be empty"),
});

// Main Component
export default function PasswordResetForm({ formId }: LoginFormProps) {
  const router = useRouter();

  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Define onSubit function
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const description = `Reset link has been sent to ${data.email}`;
    showInfoToast("Check your email!", description);

    router.push("/signin");
  }

  // Build component
  return (
    <form id={formId || "login-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <TextController label="Email" name="email" form={form} placeholder="john.red@example.com" />
      </div>
    </form>
  );
}
