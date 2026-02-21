import { Suspense } from "react";

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
} from "../ui/sidebar";
import { LogOut, Plus, Settings, SquarePlus, User } from "lucide-react";
import ChangeThemeIcon from "../utils/HandleTheme";
import Link from "next/link";
import SidebarUserLists from "@/feature/sidebar/components/UserLists";
import SidebarButton from "@/feature/sidebar/components/SidebarButton";

// Types

// Main Component
export default async function MainSidebar() {
  return (
    <Sidebar side="left" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="flex-row justify-between">
        <ChangeThemeIcon />
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarButton href="/?create=task" name="New Task" icon={<SquarePlus />} noMenu />
              <SidebarButton href="/profile" name="Profile" icon={<User />} noMenu />
              <SidebarButton href="/settings" name="Settings" icon={<Settings />} noMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

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
            <SidebarUserLists />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarButton href="/auth/signout" name="Disconnect" icon={<LogOut />} noMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
