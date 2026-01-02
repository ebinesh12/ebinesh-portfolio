"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import {
  Pencil,
  Trash2,
  Loader2,
  MoreHorizontal,
  Mail,
  User,
  Type,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MessageActions({ message, onDelete, onUpdate }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ ...message });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    if (!formData.name || !formData.email) return; // Basic validation

    setIsSaving(true);
    const success = await onUpdate(message.id, formData);
    setIsSaving(false);
    if (success) {
      setIsEditDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1">
        {/* Quick Edit Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
          className="h-8 w-8 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>

        {/* Delete Trigger via Alert Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:text-zinc-500 dark:hover:text-red-400 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <AlertDialogHeader>
              <AlertDialogTitle>Move message to trash?</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
                Are you sure you want to delete this message from{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {message.name}
                </span>
                ? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(message.id)}
                className="bg-red-600 hover:bg-red-700 text-white border-none"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* --- Edit Dialog (Outside the button structure to avoid nesting issues) --- */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <DialogHeader>
            <DialogTitle>Update Message Details</DialogTitle>
            <DialogDescription>
              Make changes to the stored message information.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-3 w-3" /> Sender Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-zinc-50 dark:bg-zinc-900"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-3 w-3" /> Email
                </Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-zinc-50 dark:bg-zinc-900"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subject" className="flex items-center gap-2">
                <Type className="h-3 w-3" /> Subject
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="bg-zinc-50 dark:bg-zinc-900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message Content</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="min-h-[150px] bg-zinc-50 dark:bg-zinc-900 resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
