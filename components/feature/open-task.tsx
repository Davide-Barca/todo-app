"use client";

import { useTransition } from "react";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import TaskForm from "./form-task";
import { Spinner } from "../ui/spinner";
import { DB } from "@/lib/database/db";

// Custom Types
type Task = {
  id: string;
  title: string;
  description: string;
};

type OpenTaskProps = {
  triggerValue?: string;
  task: DB["task"];
};

// Main Component
export default function OpenTask({ triggerValue, task }: OpenTaskProps) {
  const [isLoading, startLoading] = useTransition();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          {triggerValue || "Open"}
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-150">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="space-x-2">
            <span>Task Overview</span>
            {/* <Badge variant={task.isChecked ? "default" : "secondary"}>{task.isChecked ? "Completed" : "Pending"}</Badge> */}
          </DialogTitle>
          <DialogDescription>Check details, status, and available actions for this task.</DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div>
          <TaskForm
            transitionFn={startLoading}
            defaultValues={{ title: task.title, description: task.description || "" }}
          />
        </div>

        {/* Footer */}
        <DialogFooter className="py-3" showCloseButton disableCloseButton={isLoading}>
          <Button type="submit" form="task-form" size={"sm"} disabled={isLoading}>
            {isLoading && <Spinner />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
