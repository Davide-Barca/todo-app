"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { TransitionStartFunction } from "react";

// Components
import TextController from "@/components/utils/form-text-controller";
import { showErrorToast } from "@/lib/toast";
import TextareaController from "@/components/utils/form-textarea-controller";

// Types

// Custom Types
type LoginFormProps = {
  formId?: string;
  transitionFn: TransitionStartFunction;
};

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string(),
});

// Main Component
export default function TaskForm({ formId, transitionFn }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") || "/";

  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
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

      if (!response.ok) return showErrorToast("Task Registration Failed!", response.message);

      router.push(callbackURL || "/");
    });
  }

  // Build component
  return (
    <form id={formId || "task-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <TextController label={"Title"} name="title" form={form} placeholder="Go to the grocery shop" required />
        <TextareaController label={"Description"} name="description" form={form} placeholder="Type here..." />
      </div>
    </form>
  );
}
