"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  children,
  direction = "horizontal",
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal" ? "h-full w-full" : "flex-col h-full w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const ResizablePanel = React.forwardRef(
  ({ className, children, defaultSize = 50, minSize = 10, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("group flex-grow", className)}
        style={{ flexBasis: `${defaultSize}%` }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex w-2 flex-shrink-0 items-center justify-center bg-border hover:bg-muted/50 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 after:bg-border/90 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
};

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
