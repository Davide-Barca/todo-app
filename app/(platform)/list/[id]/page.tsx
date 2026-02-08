// Components
import OpenTask from "@/components/feature/open-task";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { List } from "lucide-react";

// Custom Types
type PageParams = {
  id: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

const list = {
  id: "b3f2a1c4-9d87-4e12-a6b9-45f3c8a21d90",
  name: "Attività Quotidiane",
  tasks: [
    {
      id: "a12c9e44-7b5f-4a21-9f3a-1c2b9d8e0f45",
      title: "Controllare le email",
      description: "Leggere e rispondere alle email di lavoro e personali.",
      isChecked: true,
    },
    {
      id: "c45e7a91-2d8f-4f3b-9b72-0e1a6d4f8c23",
      title: "Organizzare le attività",
      description: "Pianificare le priorità della giornata e aggiornare la lista dei task.",
      isChecked: false,
    },
    {
      id: "f91d3b27-6a45-4c8e-b210-9d7a5e4f1c88",
      title: "Fare una pausa",
      description: "Prendere una pausa di 10 minuti per rilassarsi e ricaricare le energie.",
      isChecked: false,
    },
    {
      id: "7e5c2b19-3f84-4a90-8d65-1b2f9c6a4e33",
      title: "Aggiornare il progetto",
      description: "Rivedere lo stato del progetto e salvare le modifiche principali.",
      isChecked: false,
    },
    {
      id: "e8a4f6d2-91c3-4b57-9a10-5c2e7f8d3b44",
      title: "Preparare il report",
      description: "Scrivere un breve report sulle attività svolte oggi.",
      isChecked: false,
    },
  ],
};

// Main Component
export default async function ListPage({ params }: PageProps) {
  const { id } = await params;

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
              <span>{list.name}</span>
            </CardTitle>
            <Button variant={"destructive"} size={"sm"}>
              Delete list
            </Button>
          </div>
          <Separator />
        </div>

        {/* Content */}
        <div className="size-full py-5 overflow-y-auto no-scrollbar">
          <div className="size-full">
            <FieldGroup className="gap-3">
              {list.tasks.map((task) => {
                return (
                  <FieldLabel key={task.id} asChild>
                    <div>
                      <Field orientation={"horizontalCenter"}>
                        <Checkbox className="size-5 cursor-pointer" id={task.id} defaultChecked={task.isChecked} />
                        <FieldContent className="peer-has-data-checked:*:line-through peer-has-data-checked:*:opacity-50">
                          <FieldTitle>{task.title}</FieldTitle>
                          <FieldDescription>{task.description}</FieldDescription>
                        </FieldContent>
                        <OpenTask task={task} />
                      </Field>
                    </div>
                  </FieldLabel>
                );
              })}
            </FieldGroup>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full p-2 bg-accent border border-border rounded-full">
          <div className="flex gap-2">
            <Input className="bg-accent shadow-none border-0 rounded-full" placeholder="Type here..." />
            <Button className="rounded-full">Add Task</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
