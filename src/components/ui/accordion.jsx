"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b data-[selected=true]:bg-transparent ", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ className, children, variant, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          `flex flex-1 items-center ${variant === "left" ? "h-10" : "h-7"}   data-[selected=true]:bg-transparent justify-between py-2 font-medium transition-all  [&[data-state=open]>svg]:rotate-180`,
          className,
        )}
        {...props}
      >
        {variant === "left" ? (
          <div className="flex items-center w-full  gap-6">
            <ChevronDown className=" shrink-0 h-6 w-4 font-semibold  transition-transform duration-200 text-slate-400" />
            {children}
          </div>
        ) : (
          <>
            {children}
            <ChevronDown className="h-6 w-4 font-semibold shrink-0 transition-transform duration-200 text-slate-400" />
          </>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden data-[selected=true]:bg-transparent  text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("", className)}>{children}</div>
    </AccordionPrimitive.Content>
  ),
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
