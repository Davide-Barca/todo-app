"use client"

import { ReactNode } from "react";
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
  SidebarTrigger,
} from "../ui/sidebar";
import { Ellipsis, Pin, Plus, Settings, User } from "lucide-react";
import ChangeThemeIcon from "../utils/change-theme";
import Link from "next/link";
import { toast } from "sonner";

const lists = [
  {
    id: "f3b1a9c2-4c8d-4a27-9e1f-2c4a6b7e91d1",
    name: "Attività Quotidiane",
    activityCount: 18,
  },
  {
    id: "a7d4c9f1-2b35-4d9e-8a21-6f4b3e9c2d77",
    name: "Progetti Lavorativi",
    activityCount: 25,
  },
  {
    id: "c2e91b47-8f14-4b29-9d63-5a7e1c4f8b90",
    name: "Allenamenti Settimanali",
    activityCount: 7,
  },
  {
    id: "9d5b3f8a-6c42-4e17-b291-7f84c1a5e903",
    name: "Studio Personale",
    activityCount: 12,
  },
  {
    id: "4a7c91d3-b5e6-41f8-9c2d-7b3e5f60a214",
    name: "Commissioni e Spese",
    activityCount: 3,
  },
  {
    id: "e61f7a9b-2d5c-4f83-91b2-8a7c3d4e590f",
    name: "Obiettivi Mensili",
    activityCount: 21,
  },
  {
    id: "b84c6d5a-9f21-4e37-8a91-2c7d5f3e609b",
    name: "Idee Creative",
    activityCount: 9,
  },
  {
    id: "3c7e8f41-9d6a-4b2c-a157-6e2f5b49d803",
    name: "Manutenzione Casa",
    activityCount: 15,
  },
  {
    id: "5f4b7e9d-1c28-4a63-b092-8d3c6a51f947",
    name: "Piano Fitness",
    activityCount: 27,
  },
  {
    id: "7a2e9f63-5c41-4d8b-b190-6f3a8c7e5214",
    name: "Viaggi e Vacanze",
    activityCount: 6,
  },
];

export default function MainSidebar() {
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
              <ListItem href="/profile" name="Profile" icon={<User />} noActions />
              <ListItem href="/settings" name="Settings" icon={<Settings />} noActions />
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
          <SidebarGroupAction onClick={() => toast("Add Project")}>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>

          {/* Lists */}
          <SidebarGroupContent>
            {/* Menu */}
            <SidebarMenu>
              {lists.map(({ id, name, activityCount }) => (
                <ListItem key={id} href={`/list/${id}`} name={name} activityCount={activityCount} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}

// Unique Components
type ListItemProps = {
  href: string;
  name: string;
  activityCount?: number;
  icon?: ReactNode;
  noActions?: boolean;
};

function ListItem({ href, name, activityCount, icon, noActions = false }: ListItemProps) {
  let hasBadge = activityCount && activityCount > 0 ? true : false
  
  return (
    <SidebarMenuItem className="group/menu-item">
      <SidebarMenuButton asChild>
        <Link href={href} className="[&>svg]:text-primary">
          {icon}
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>

      {hasBadge && <SidebarMenuBadge className="group-hover/menu-item:hidden">{activityCount}</SidebarMenuBadge>}

      {!noActions && (
        <SidebarMenuAction className="hidden group-hover/menu-item:flex">
          <Ellipsis />
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  );
}
