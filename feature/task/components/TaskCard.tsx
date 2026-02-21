"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/lib/toast";

// Components
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import TaskDialog from "./TaskDialog";

// Actions
import { editUserTaskDoneAction } from "@/feature/task/actions/update";

// Types
import { DB } from "@/lib/database/db";

// Custom Types
type ComponentProps = {
  task: DB["task"];
};

// Main Component
export default function TaskCard({ task }: ComponentProps) {
  const router = useRouter();

  async function handleCheck(checked: boolean) {
    const result = await editUserTaskDoneAction(task.listId, task.id, checked);
    if (!result) showErrorToast("Failed to update task status. Please try again.");

    router.refresh();
  }

  return (
    <FieldLabel asChild>
      <div>
        <Field orientation={"horizontalCenter"}>
          <Checkbox
            onCheckedChange={handleCheck}
            className="size-5 cursor-pointer"
            id={task.id}
            defaultChecked={Boolean(task.isDone)}
          />
          <FieldContent className="peer-has-data-checked:*:line-through peer-has-data-checked:*:opacity-50">
            <FieldTitle>{task.title}</FieldTitle>
            {task.description && <FieldDescription>{task.description}</FieldDescription>}
          </FieldContent>
          <TaskDialog task={task} />
        </Field>
      </div>
    </FieldLabel>
  );
}
