"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle, Square } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioGroupVariants = cva(
  `flex  justify-center rounded-sm items-center w-4 h-4 outline-hidden border-[.3rem]  focus:border-[#005BE6]
  focus-visible:ring-[#005BE6]/60 focus-visible:ring-offset-2 
  active:border-[#005BE6] active-visible:ring-[#005BE6]/60 active-visible:ring-offset-2 
   border p-1 border-slate-200 bg-white  
  ring-offset-white file:border-0 file:bg-transparent
    dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300`,
  {
    variants: {
      variant: {
        circle:
          "aspect-circle w-4 h-4 rounded-full  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-50 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
        square:
          "aspect-square w-4 h-4 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-50 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
      },
      size: {
        xs: "h-3 w-3",
        sm: "h-3.5 w-3.5",
        default: "h-10 ",
        lg: "h-5 w-5  ",
        xl: "h-12 w-12",
        "2xl": "h-14 text-base py-1",
      },
    },
    defaultVariants: {
      // variant: "default",
      // size: "default",
    },
  },
);

const RadioGroupItem = React.forwardRef(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioGroupVariants({ size, className, variant }))}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          {variant == "circle" && (
            <Circle className="h-2.5 w-2.5 fill-[#005BE6]  text-[#005BE6]" />
          )}
          {variant == "squre" && (
            <Square className="h-2.5 w-2.5 fill-[#005BE6] rounded-lg text-[#005BE6] " />
          )}
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  },
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
