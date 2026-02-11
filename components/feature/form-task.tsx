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
import { updateUserTask } from "@/lib/database/query/update/update-task";
import { toast } from "sonner";
import { editUserTaskAction } from "@/actions/update/task";

// Types

// Custom Types
type LoginFormProps = {
  formId?: string;
  transitionFn: TransitionStartFunction;
  defaultValues?: z.infer<typeof formSchema>;
  listId: string;
  taskId: string;
};

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string(),
});

// Main Component
export default function TaskForm({ formId, transitionFn, defaultValues, listId, taskId }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") || "/";

  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
    },
  });

  // Define onSubit function
  async function onSubmit(data: z.infer<typeof formSchema>) {
    transitionFn(async () => {
      const result = await editUserTaskAction(listId, taskId, { title: data.title, description: data.description });

      if (!result) {
        showErrorToast("Failed to update task. Please try again.");
        return;
      }

      toast.success("Task updated successfully!");
      router.push(`/list/${listId}`);
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
