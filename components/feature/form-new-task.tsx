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
import { addUserTask } from "@/actions/post/task";

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
export default function TaskNewForm({ formId, transitionFn }: LoginFormProps) {
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
      const response = await addUserTask("56d289e0-7e34-44c2-baa3-c9378b6ad7c0", data.title, data.description);

      if (!response) return showErrorToast("Task Registration Failed!");

      router.push(`/list/56d289e0-7e34-44c2-baa3-c9378b6ad7c0`);
    });
  }

  // Build component
  return (
    <form id={formId || "new-task-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <TextController label={"Title"} name="title" form={form} placeholder="Go to the grocery shop" required />
        <TextareaController label={"Description"} name="description" form={form} placeholder="Type here..." />
      </div>
    </form>
  );
}
