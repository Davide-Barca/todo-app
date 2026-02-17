"use client";

import React from "react";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import OpenTask from "./open-task";
import { DB } from "@/lib/database/db";
import { editUserTaskDoneAction } from "@/actions/update/task";
import { showErrorToast, showInfoToast } from "@/lib/toast";
import { useRouter } from "next/navigation";

// Custom Types
type ComponentProps = {
  task: DB["task"];
};

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
          <OpenTask task={task} />
        </Field>
      </div>
    </FieldLabel>
  );
}
