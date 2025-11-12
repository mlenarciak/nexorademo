"use client";

import { useOthers, useSelf } from "@repo/collaboration/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/design-system/components/ui/tooltip";

type PresenceAvatarProps = {
  info?: Liveblocks["UserMeta"]["info"];
};

const MAX_DISPLAYED_COLLABORATORS = 3;

const PresenceAvatar = ({ info }: PresenceAvatarProps) => (
  <Tooltip delayDuration={0}>
    <TooltipTrigger>
      <Avatar className="h-7 w-7 bg-secondary ring-1 ring-background">
        <AvatarImage alt={info?.name} src={info?.avatar} />
        <AvatarFallback className="text-xs">
          {info?.name?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    </TooltipTrigger>
    <TooltipContent collisionPadding={4}>
      <p>{info?.name ?? "Unknown"}</p>
    </TooltipContent>
  </Tooltip>
);

export const AvatarStack = () => {
  const others = useOthers();
  const self = useSelf();
  const hasMoreUsers = others.length > MAX_DISPLAYED_COLLABORATORS;

  return (
    <div className="-space-x-1 flex items-center px-4">
      {others
        .slice(0, MAX_DISPLAYED_COLLABORATORS)
        .map(({ connectionId, info }) => (
          <PresenceAvatar info={info} key={connectionId} />
        ))}

      {hasMoreUsers && (
        <PresenceAvatar
          info={{
            name: `+${others.length - MAX_DISPLAYED_COLLABORATORS}`,
            color: "var(--color-muted-foreground)",
          }}
        />
      )}

      {self && <PresenceAvatar info={self.info} />}
    </div>
  );
};
