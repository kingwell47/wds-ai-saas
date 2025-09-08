"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { name: "light", icon: Sun },
  { name: "dark", icon: Moon },
  { name: "system", icon: Laptop },
] as const;

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='outline' size='icon' aria-label='Toggle theme' disabled>
        <Laptop className='h-5 w-5' />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='Toggle theme'>
          {resolvedTheme === "dark" ? (
            <Moon />
          ) : resolvedTheme === "light" ? (
            <Sun />
          ) : (
            <Laptop className='h-5 w-5' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {themes.map(({ name, icon }) => {
          const Icon = icon;
          return (
            <DropdownMenuItem
              key={name}
              onClick={() => setTheme(name)}
              className={cn(
                "cursor-pointer",
                theme === name && "bg-accent text-accent-foreground"
              )}>
              <Icon />
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
