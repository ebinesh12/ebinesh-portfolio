"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  // Handle toast close - must be defined here to access dismiss function
  const handleToastClose = (id, customOnClose) => {
    // First run any custom close handler if provided
    if (typeof customOnClose === "function") {
      customOnClose();
    }

    // Then dismiss the toast
    dismiss(id);
  };

  return (
    <ToastProvider>
      {toasts?.map(function ({
        id,
        title,
        description,
        action,
        onClose,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose onClick={() => handleToastClose(id, onClose)} />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
