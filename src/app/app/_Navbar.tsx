"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/features/users/components/UserAvatar";
import ThemeToggle from "@/services/clerk/components/ui/ThemeToggle";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { BrainCircuitIcon, LogOut, User } from "lucide-react";
import Link from "next/link";

export function NavBar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();

  return (
    <nav className='w-full h-header border-b flex items-center justify-between px-6'>
      {/* Left: Logo and App Name */}
      <Link href='/app' className='flex items-center gap-2'>
        <BrainCircuitIcon className='size-8 text-primary' />
        <span className='font-bold text-lg tracking-tight'>Landr</span>
      </Link>

      {/* Right: Theme Toggle & User Dropdown */}
      <div className='flex items-center gap-4'>
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserAvatar user={user} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuItem onClick={() => openUserProfile()}>
              <User className='mr-2' />
              Profile
            </DropdownMenuItem>
            <SignOutButton>
              <DropdownMenuItem>
                <LogOut className='mr-2' />
                Logout
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
