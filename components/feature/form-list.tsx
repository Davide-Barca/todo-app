"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { TransitionStartFunction } from "react";

// Components
import TextController from "../utils/form-text-controller";
import { showErrorToast } from "@/lib/toast";

// Types

// Custom Types
type LoginFormProps = {
  formId?: string;
  transitionFn: TransitionStartFunction;
};

// Form schema
const formSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
});

// Main Component
export default function ListForm({ formId, transitionFn }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") || "/";

  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Define onSubit function
  async function onSubmit(data: z.infer<typeof formSchema>) {
    transitionFn(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 5000);
      });

      const response = { ok: false, message: "" };

      if (!response.ok) return showErrorToast("List Registration Failed!", response.message);

      router.push(callbackURL || "/");
    });
  }

  // Build component
  return (
    <form id={formId || "list-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <TextController label={"Name"} name="name" form={form} placeholder="Routine activities" required />
      </div>
    </form>
  );
}
