"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const Tabs = TabsPrimitive.Root;

const tabListVariants = cva("", {
  variants: {
    variant: {
      timeline: "relative",
      border: "relative  border-b-[#D9DBDE]",
      default: "bg-slate-100 p-1.5 rounded-lg",
    },
    size: {
      xs: "h-8",
      sm: "h-9",
      default: "h-10 ",
      lg: "h-11  ",
      xl: "h-12",
      "2xl": "h-14 text-base py-1",
    },
  },
  defaultVariants: {
    // variant: "default",
    // size: "default",
  },
});

const TabsList = React.forwardRef(
  ({ size, variant, className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabListVariants({ size, variant, className }))}
      {...props}
    />
  ),
);
TabsList.displayName = TabsPrimitive.List.displayName;

const triggerVariants = cva(
  `h-[40px] text-sm font-medium ring-offset-white transition-all 
focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-950 
focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  p-[1rem_1.5rem] gap-4 inline-flex items-center justify-center whitespace-nowrap `,
  {
    variants: {
      variant: {
        timeline: "absolute w-[200px] text-left flex justify-start",
        default:
          "bg-slate-100 data-[state=active]:text-white  data-[state=active]:bg-primary dark:text-slate-500 dark:data-[state=active]:text-white  data-[state=active]:rounded-lg",
        error: ` rounded-[100px]  
       bg-[#EDEDED] mr-4 text-[#252525]
               data-[state=active]:bg-red-500 data-[state=active]:text-white  
        data-[state=active]:shadow-xs dark:ring-offset-slate-950
         dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50,
      success: "focus-visible:ring-green-600`,
        primary: `rounded-[100px]  
       bg-[#EDEDED] mr-4 text-[#252525]
               data-[state=active]:bg-[#005BE6] data-[state=active]:text-white  
        data-[state=active]:shadow-xs dark:ring-offset-slate-950 dark:bg-black dark:text-white dark:border-[2px] dark:border-bg-red-50/10
         dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-primary dark:data-[state=active]:text-slate-50`,
        secondary: `
              mr-4 text-[#252525]
               data-[state=active]:bg-[#005BE6] data-[state=active]:text-white  
        data-[state=active]:shadow-xs dark:ring-offset-slate-950
         dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50`,
        border: `h-14 text-start absolute top-[.1em]  mr-4 
          data-[state=active]:shadow-xs dark:ring-offset-slate-950
         dark:focus-visible:ring-slate-300 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-[#005BE6] dark:data-[state=active]:text-slate-50`,
      },
      size: {
        xs: "h-8",
        sm: "h-9",
        default: "h-10 ",
        lg: "h-11  ",
        xl: "h-12",
        "2xl": "h-14 text-base py-1",
      },
    },
    defaultVariants: {
      // variant: "default",
      // size: "default",
    },
  },
);

const TabsTrigger = React.forwardRef(
  ({ size, variant, className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(triggerVariants({ size, variant, className }))}
      {...props}
    />
  ),
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
