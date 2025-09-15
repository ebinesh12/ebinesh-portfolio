"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Square } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `peer  border-2 border-[#D9DBDE] h-4 w-4 shrink-0 
      ring-offset-white focus-visible:outline-hidden 
      focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 
      data-[state=checked]:bg-white 
      data-[state=checked]:border-[#005BE6]       
      data-[state=checked]:text-[#005BE6] 
      dark:border-slate-800 
      dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 
      dark:data-[state=checked]:bg-slate-50 
      dark:data-[state=checked]:text-slate-900`,
      variant === "square" ? "rounded " : "rounded-sm",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {variant === "square" ? (
        <Square className="h-2.5 w-2.5 fill-[#005BE6]" />
      ) : (
        <Check className="h-3 w-3   border-primary fill-primary" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
