"use client";

import React from "react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteUserListAction } from "@/actions/delete/list";
import { useRouter } from "next/navigation";

export default function ListMenu({ listId }: { listId: string }) {
  const router = useRouter();

  async function handleDelete() {
    await deleteUserListAction(listId);

    router.push("/?create=list");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>Reneme</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
