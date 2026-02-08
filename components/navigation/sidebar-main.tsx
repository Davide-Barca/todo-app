"use client";

import { ReactNode, useEffect, useState, useTransition } from "react";

// Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "../ui/sidebar";
import { Ellipsis, LogOut, Plus, Settings, SquarePlus, User } from "lucide-react";
import ChangeThemeIcon from "../utils/change-theme";
import Link from "next/link";

// Actions
import { getAllLists } from "@/actions/get/lists";

// Types
import { ListRow } from "@/lib/database/types/list";

// Main Component
export default function MainSidebar() {
  const [isLoading, startLoading] = useTransition();
  const [lists, setLists] = useState<ListRow[] | null>(null);

  // Load user lists
  useEffect(() => {
    startLoading(async () => {
      const lists = await getAllLists();
      setLists(lists);
    });
  }, []);

  return (
    <Sidebar side="left" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="flex-row justify-between">
        <ChangeThemeIcon />
        {/* <SidebarTrigger /> */}
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ListItem href="/?create=task" name="New Task" icon={<SquarePlus />} noMenu />
              <ListItem href="/profile" name="Profile" icon={<User />} noMenu />
              <ListItem href="/settings" name="Settings" icon={<Settings />} noMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Quick Actions */}

        {/* Pinned */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Pinned</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ListItem href="#" name="Pinned List" icon={<Pin />} activityCount={11} />
              <ListItem href="#" name="Pinned List 2" icon={<Pin />} activityCount={0} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* List Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Todo Lists</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <Link href={"/?create=list"}>
              <Plus /> <span className="sr-only">Add List</span>
            </Link>
          </SidebarGroupAction>

          {/* Lists */}
          <SidebarGroupContent>
            {/* Menu */}
            <SidebarMenu>
              {!lists && (
                <>
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                </>
              )}
              {!isLoading && lists && lists.map(({ id, title }) => <ListItem key={id} href={`/list/${id}`} name={title} activityCount={10} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ListItem href="/auth/signout" name="Disconnect" icon={<LogOut />} noMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

// Unique Components
type ListItemProps = {
  href: string;
  name: string;
  activityCount?: number;
  icon?: ReactNode;
  noMenu?: boolean;
};

function ListItem({ href, name, activityCount, icon, noMenu = false }: ListItemProps) {
  let hasBadge = !!activityCount && activityCount > 0;

  return (
    <SidebarMenuItem className="group/menu-item">
      <SidebarMenuButton asChild>
        <Link href={href} className="[&>svg]:text-primary">
          {icon}
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>

      {hasBadge && <SidebarMenuBadge className="group-hover/menu-item:hidden">{activityCount}</SidebarMenuBadge>}

      {!noMenu && (
        <SidebarMenuAction className="hidden group-hover/menu-item:flex">
          <Ellipsis />
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  );
}
