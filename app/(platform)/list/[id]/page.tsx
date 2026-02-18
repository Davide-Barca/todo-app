// Components
import { getListDataById } from "@/actions/get/list";
import InputNewTask from "@/components/feature/input-new-task";
import TaskCard from "@/components/feature/task-card";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { List } from "lucide-react";
import { notFound } from "next/navigation";

// Custom Types
type PageParams = {
  id: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

// Main Component
export default async function ListPage({ params }: PageProps) {
  const { id } = await params;

  // Get list data
  const data = await getListDataById(id);
  if (!data) return notFound();

  const { list, tasks } = data!;

  return (
    <div className="size-full flex justify-center">
      <div className="w-3/4 2xl:w-1/2 h-full flex flex-col p-5">
        {/* Header */}
        <div className="space-y-1 h-fit">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-1">
              <Button variant={"ghost"} size={"icon-sm"}>
                <List className="text-primary" strokeWidth={3} />
              </Button>
              <span>{list.title}</span>
            </CardTitle>
            {/* <Button variant={"destructive"} size={"sm"}>
              Delete list
            </Button> */}
          </div>
          <Separator />
        </div>

        {/* Content */}
        <div className="size-full py-5 overflow-y-auto no-scrollbar">
          <div className="size-full">
            <FieldGroup className="gap-3">
              {tasks.length > 0 &&
                tasks.map((task) => {
                  if (!task.isDone) {
                    return <TaskCard key={task.id} task={task} />;
                  }
                })}
              {tasks.length > 0 &&
                tasks.map((task) => {
                  if (task.isDone) {
                    return <TaskCard key={task.id} task={task} />;
                  }
                })}
              {tasks.length === 0 && <FieldDescription className="text-center">No Tasks</FieldDescription>}
            </FieldGroup>
          </div>
        </div>

        {/* Footer */}
        <InputNewTask listId={list.id} />
      </div>
    </div>
  );
}
