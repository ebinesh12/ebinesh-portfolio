import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        chat: "border-transparent bg-grey-500 text-slate-50 dark:bg-red-900 dark:text-slate-50",
        outline: "text-slate-950 dark:text-slate-50",
        active:
          "rounded-sm px-5 py-[.3rem] text-[#3EAF3F] border border-[#3EAF3F] bg-[#E2FFEE]   dark:text-slate-50",
        actionRequired:
          "rounded-sm px-5 py-[.3rem] text-[#005BE6] border border-[#005BE6] bg-[#D4E5FF]   dark:text-slate-50",
        inActive:
          "rounded-sm px-5 py-[.3rem] text-gray-400 border border-gray-400 bg-gray-100   dark:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
