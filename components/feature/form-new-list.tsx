"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { TransitionStartFunction } from "react";

// Components
import TextController from "../utils/form-text-controller";
import { showErrorToast } from "@/lib/toast";
import { addUserList } from "@/actions/post/list";

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
      const response = await addUserList(data.name);

      if (!response) return showErrorToast("List Registration Failed!");

      router.push(`/list/${response.id}`);
    });
  }

  // Build component
  return (
    <form id={formId || "new-list-form"} onSubmit={form.handleSubmit(onSubmit)} suppressHydrationWarning>
      <div className="flex flex-col gap-4">
        <TextController label={"Name"} name="name" form={form} placeholder="Routine activities" required />
      </div>
    </form>
  );
}
