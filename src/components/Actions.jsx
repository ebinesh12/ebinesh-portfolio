"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// The 'themes' prop is added to allow for dynamic gradient styling
export function ActionsCell({ message, onDelete, onUpdate, themes }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    const success = await onUpdate(message.id, formData);
    if (success) {
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="flex mx-auto gap-2 justify-end">
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className={cn(
                "px-6 py-2 rounded-md font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
              )}>
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "sm:max-w-[425px] w-3/4",
            "bg-white/40 dark:bg-white/25 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-white/40 transition-colors duration-700",
          )}
        >
          <DialogHeader>
            <DialogTitle
              className={cn(
                "bg-clip-text text-transparent font-semibold",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 to-cyan-500",
              )}
            >
              Edit Message
            </DialogTitle>
            <DialogDescription>
              Update the details of the message below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="message" className="text-right pt-2">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" className={cn(
                "px-6 py-2 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
              )}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleSaveChanges}
              className={cn(
                "px-6 py-2 mb-4 md:mb-0 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
              )}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className={cn(
                "px-6 py-2 rounded-md font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
              )}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          className={cn(
            "w-3/4 bg-white/40 dark:bg-white/20 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-white/30 transition-colors duration-700",
          )}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className={cn(
                "bg-clip-text text-transparent font-semibold",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-red-500 to-orange-500", // Destructive gradient
              )}
            >
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              message from {message.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={cn(
                "px-6 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
              )}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(message.id)} className={cn(
                "px-6 py-2 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
              )}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}