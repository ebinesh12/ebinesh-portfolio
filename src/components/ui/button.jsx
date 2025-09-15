import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex  items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none  dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90 h-[2.5rem] p-[1rem_1.4rem] font-semibold",
        outline:
          "h-[2.5rem] border p-[1rem_1.4rem]  dark:bg-[#0D0D0D] dark:text-[#F3F3F3] dark:hover:bg-[#0D0D0D]/90 gap-4",
        ["select button"]:
          "h-[2.5rem] border  dark:bg-[#F3F3F3] dark:text-[#F3F3F3] dark:hover:bg-[#F3F3F3]/90 gap-4",
        ["arrow button"]:
          "h-[2.9rem] border p-3 text-[#FFFFFF] bg-[#005BE6] hover:bg-[#1e40af] dark:bg-primary dark:text-[#FFFFFF] dark:hover:bg-primary gap-4",
        // secondary:
        //   "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ["roundless outline"]:
          "h-[2.5rem] border p-[1rem_1.4rem] rounded-[2px]  dark:bg-[#0D0D0D] dark:text-primary dark:hover:bg-[#F3F3F3]/5 gap-4 border-[#FFFFFF]",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-[2.5rem] p-[1rem_1.4rem] font-semibold",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        warn: "text-xs font-medium hover:bg-[#FF9E0D]/50 dark:bg-[#FF9E0D] dark:text-[#FFFFFF] dark:hover:bg-[#FF9E0D]/90 dark:hover:text-white p-[5px_15px] text-[#BC7100] gap-4 rounded-tl-md border border-opacity-1 bg-[#FFDAA3] border-[#FF9E0D]",
        muted:
          "text-xs font-medium dark:hover:text-[#FFFFFF]  hover:bg-[#F3F3F3]/50 dark:bg-[#F3F3F3]/10 dark:text-[#FF9E0D] dark:hover:bg-[#FF9E0D]/90 p-[5px_15px] text-[#787878] gap-4 rounded-tl-md  bg-[#F3F3F3] ",
        primary:
          "bg-[#005BE6] h-[2.5rem] p-[1rem_1.4rem]  text-white hover:bg-[#0051cd] dark:bg-[#005BE6] dark:text-[#FFFFFF] gap-4 font-semibold",
        secondary:
          "bg-[#F3F3F3]  h-[2.5rem] p-[1rem_1.4rem]  text-[#787878] hover:bg-[#F3F3F3]/50 dark:bg-[#F3F3F3] dark:text-[#F3F3F3] dark:hover:bg-[#F3F3F3]/90 gap-4",
        ["primary-outline"]:
          "bg-transparant dark:hover:text-white dark:hover:border-[#FF9E0D] border-[#005BE6] border-2 h-[2.5rem] p-[1rem_1.4rem]  text-[#005BE6] hover:bg-[#edf4ff] dark:bg-[#005BE6] dark:text-[#FF9E0D] dark:hover:bg-[#FF9E0D]/90 gap-4",
        ["secondary-outline"]:
          "bg-transparant border-[#BDBDBD] border-2 h-[2.5rem] p-[1rem_1.4rem]  text-[#9D9D9D] hover:bg-[#e2e2e2]/50  dark:text-[#BDBDBD] gap-4 w-full",
        ["image-button-with-secondary-border"]:
          "bg-transparent border-[#BDBDBD] border-2 h-[2.8rem] w-[2.8rem] p-[0.5rem] text-[#9D9D9D] hover:bg-[#e2e2e2]/50 dark:text-[#BDBDBD] flex items-center justify-center",
        ["clear-secondary"]:
          "bg-[#F3F3F3]  dark:border-[2px] dark:border-bg-primary  h-[2.5rem] p-[1rem_1.4rem]  text-[#787878] hover:bg-[#F3F3F3]/50 dark:bg-black dark:text-[#FFFFFF] dark:hover:bg-red-900 gap-4",
        ["destructive-outline"]:
          "bg-transparant border-red-500 border h-[2.5rem] p-[1rem_1.4rem] text-red-500  dark:text-slate-50 h-[2.5rem] p-[1rem_1.4rem] font-semibold",
        ["rounded-outline"]:
          "h-[1.5rem] w-[1.5rem] border  rounded-full dark:bg-[#0D0D0D] dark:text-[#F3F3F3] dark:hover:bg-[#0D0D0D]/90 ",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 rounded-md px-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      // variant: "default",
      // size: "default",
    },
  },
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      color,
      bgColor,
      size,
      border,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          `bg-${bgColor} text-${color} border-${border}`,
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
