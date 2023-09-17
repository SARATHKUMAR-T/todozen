import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function HoverDisplay({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        align="start"
        sideOffset={4}
        className="w-44 text-[12px] text-center"
      >
        {title}
      </HoverCardContent>
    </HoverCard>
  );
}
