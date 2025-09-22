import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComponentProps } from "react";

export function UserAvatar({
  user,
  ...props
}: {
  user: { name: string; imageUrl: string };
} & ComponentProps<typeof Avatar>) {
  return (
    <Avatar {...props} className='cursor-pointer'>
      <AvatarImage src={user.imageUrl} alt={user.name} />
      <AvatarFallback className='uppercase'>
        {user.name
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}
