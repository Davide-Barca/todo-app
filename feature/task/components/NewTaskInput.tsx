"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

// Components
import { showErrorToast } from "@/lib/toast";
import { addUserTask } from "@/feature/task/actions/add";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Types

// Custom Types

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
});

// Main Component
export default function InputNewTask({ listId }: { listId: string }) {
  const router = useRouter();
  const [isLoading, startLoading] = useTransition();

  // Define useForm form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // Define onSubit function
  async function onSubmit(data: z.infer<typeof formSchema>) {
    startLoading(async () => {
      const response = await addUserTask(listId, data.title);

      if (!response) return showErrorToast("Task Registration Failed!");

      router.push(`/list/${listId}`);
      
      form.reset();
    });
  }

  // Build component
  return (
    <form id={"input-task-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="w-full p-2 bg-accent border border-border rounded-full">
        <div className="flex gap-2">
          <Controller
            name={"title"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                className="bg-accent shadow-none border-0 rounded-full"
                placeholder="Type here..."
                aria-invalid={fieldState.invalid}
              />
            )}
          />
          <Button type="submit" className="rounded-full">
            {isLoading && <Spinner />}
            Add Task
          </Button>
        </div>
      </div>
    </form>
  );
}
