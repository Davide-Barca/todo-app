"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function HandleTheme({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { setTheme, resolvedTheme } = useTheme();
  const [icon, setIcon] = useState<ReactNode | undefined>(undefined);

  // Click function
  function handleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  // Mount icon after render
  useEffect(() => {
    setIcon(resolvedTheme === "dark" ? <Sun /> : <Moon />);
  }, [resolvedTheme]);

  return (
    <Button data-slot="change-theme" variant="ghost" size="icon-sm" className={cn(className)} onClick={handleTheme} {...props}>
      {icon}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
