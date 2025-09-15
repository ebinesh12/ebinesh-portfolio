"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  getMessages,
  deleteMessage,
  updateMessage,
} from "@/services/contactService";
import { Toaster, toast } from "sonner";
import { ActionsCell } from "@/components/Actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactAdminPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to fetch messages.");
      toast.error("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      toast.success("Message has been deleted successfully.");
      fetchMessages(); // Refresh the list after deleting
    } catch (err) {
      toast.error("An error occurred while deleting the message.");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateMessage(id, updatedData);
      toast.success("Message has been updated successfully.");
      fetchMessages(); // Refresh the list after updating
      return true; // Indicate success to close the dialog
    } catch (err) {
      toast.error("An error occurred while updating the message.");
      return false; // Indicate failure
    }
  };

  const renderSkeleton = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-48" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-20" />
        </TableCell>
      </TableRow>
    ));

  return (
    <div className="container mx-auto py-2">
      <Toaster position="top-center" richColors />
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>
            View and manage messages submitted through your contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                renderSkeleton()
              ) : error ? (
                <TableRow>
                  <TableCell colSpan="5" className="text-center text-red-500">
                    {error}
                  </TableCell>
                </TableRow>
              ) : messages.length > 0 ? (
                messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">
                      {message.name}
                    </TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {message.message}
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionsCell
                        message={message}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center">
                    No messages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
