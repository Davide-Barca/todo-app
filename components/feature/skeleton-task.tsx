import React from "react";

// Components
import { Field, FieldContent, FieldLabel } from "../ui/field";
import { Skeleton } from "../ui/skeleton";

// Main Component
export default function TaskSkeleton() {
  return (
    <FieldLabel asChild>
      <div>
        <Field orientation={"horizontalCenter"}>
          <Skeleton className="size-5 rounded" />
          <FieldContent className="peer-has-data-checked:*:line-through peer-has-data-checked:*:opacity-50">
            <Skeleton className="w-30 h-3" />
            <Skeleton className="w-70 h-3 mt-2" />
          </FieldContent>
          <Skeleton className="w-15 h-7" />
        </Field>
      </div>
    </FieldLabel>
  );
}
