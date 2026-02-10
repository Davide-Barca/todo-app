"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { TransitionStartFunction } from "react";
import { useLoadingEffect } from "@/hooks/use-loading-effect";

// Components
import TextController from "@/components/utils/form-text-controller";
import { showErrorToast } from "@/lib/toast";
import TextareaController from "@/components/utils/form-textarea-controller";
import { addUserTask } from "@/actions/post/task";
import SelectController from "../utils/form-select-controller";
import { getUserLists } from "@/actions/get/lists";
import { Skeleton } from "../ui/skeleton";

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
  list: z.string().min(1, "Please select a list"),
});

// Main Component
export default function TaskNewForm({ formId, transitionFn }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: lists, isCompleted } = useLoadingEffect({ effect: getUserLists });
  const callbackURL = searchParams.get("callbackUrl") || "/";

  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      list: "",
    },
  });

  // Define onSubit function
  async function onSubmit(data: z.infer<typeof formSchema>) {
    transitionFn(async () => {
      const response = await addUserTask(data.list, data.title, data.description);

      if (!response) return showErrorToast("Task Registration Failed!");

      router.push(`/list/${data.list}`);
    });
  }

  // Build component
  return (
    <form id={formId || "new-task-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <TextController label={"Title"} name="title" form={form} placeholder="Go to the grocery shop" required />
        <TextareaController label={"Description"} name="description" form={form} placeholder="Type here..." />
        {!isCompleted && <Skeleton className="w-full h-10" />}
        {isCompleted && lists && (
          <SelectController
            label="List"
            name="list"
            form={form}
            placeholder="Select list"
            items={lists.map((list) => ({ value: list.id, label: list.title }))}
            required
          />
        )}
      </div>
    </form>
  );
}
