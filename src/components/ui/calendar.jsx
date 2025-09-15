"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, ...props }) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      classNames={{
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        day_selected: "bg-slate-900 text-white rounded-md",
        day_today: "bg-slate-100 text-slate-900 rounded-md",
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
