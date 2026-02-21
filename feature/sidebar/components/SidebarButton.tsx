"use client";

import { SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { ReactNode } from "react";
import ButtonMenu from "./ButtonMenu";

// Unique Components
type BaseListItemProps = {
  href: string;
  name: string;
  activityCount?: number;
  icon?: ReactNode;
};

type ListItemProps =
  | (BaseListItemProps & {
      noMenu?: false;
      id: string;
    })
  | (BaseListItemProps & {
      noMenu: true;
      id?: never;
    });

export default function SidebarButton({ id, href, name, activityCount, icon, noMenu = false }: ListItemProps) {
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
        <SidebarMenuAction>
          <ButtonMenu listId={id!} />
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  );
}
