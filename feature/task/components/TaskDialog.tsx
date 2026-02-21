"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskForm from "./TaskForm";
import { Spinner } from "@/components/ui/spinner";
import { Trash } from "lucide-react";

// Actions
import { deleteUserTaskAction } from "@/feature/task/actions/delete";

// Types
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
export default function TaskDialog({ triggerValue, task }: OpenTaskProps) {
  const router = useRouter();
  const [isLoading, startLoading] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  function handleDelete() {
    startDeleting(async () => {
      const result = await deleteUserTaskAction(task.id);

      if (!result) toast.error("Failed to delete task!");

      if (result) {
        toast.success("Task deleted successfully!");
        router.push(`/list/${task.listId}`);
      }
    });
  }

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
            listId={task.listId}
            taskId={task.id}
          />
        </div>

        {/* Footer */}
        <DialogFooter className="py-3" showCloseButton disableCloseButton={isLoading}>
          <div className="w-full flex justify-between">
            <Button onClick={handleDelete} variant={"destructive"} size={"sm"} disabled={isLoading}>
              {isDeleting ? <Spinner /> : <Trash />}
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button type="submit" form="task-form" size={"sm"} disabled={isLoading}>
              {isLoading && <Spinner />}
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
