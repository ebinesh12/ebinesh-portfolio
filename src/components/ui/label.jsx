"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "",
        error: "focus-visible:ring-red-600 ",
        success: "focus-visible:ring-green-600 ",
        primary: "focus-visible:ring-primary",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base ",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
    },
    defaultVariants: {
      variant: "error",
      size: "sm",
    },
  },
);

const Label = React.forwardRef(
  ({ className, size, asChild = false, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("mb-1 block", labelVariants({ size, className }))}
      {...props}
    />
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
