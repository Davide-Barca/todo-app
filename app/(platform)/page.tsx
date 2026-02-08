"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Components
import NewListForm from "@/components/feature/form-new-list";
import NewTaskForm from "@/components/feature/form-new-task";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

// Custom Types
type SearchParams = {
  create: "task" | "list";
};

// Main Component
export default function Page() {
  const [isLoading, startLoading] = useTransition();
  const searchParams = useSearchParams();

  // Get query param
  const create = searchParams.get("create") || "task";
  const createOpposite = create === "list" ? "task" : "list";

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full h-fit max-w-lg">
        <CardHeader>
          <CardTitle>New {create || "task"}</CardTitle>
          <CardDescription>Create a new {create || "task"} and assign it to a list.</CardDescription>
          <CardAction>
            <Button variant={"link"} disabled={isLoading}>
              <Link href={`/?create=${createOpposite}`}>Create {createOpposite}</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {create === "task" && <NewTaskForm transitionFn={startLoading} />}
          {create === "list" && <NewListForm transitionFn={startLoading} />}
        </CardContent>
        <CardFooter className="grid">
          <Button type="submit" form={`new-${create}-form`} disabled={isLoading}>
            {isLoading && <Spinner />}
            Create {create}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
