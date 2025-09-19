"use client";

import { useState, useEffect } from "react";
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
import { useTheme } from "@/utils/ThemeProvider";
import { cn } from "@/lib/utils";
import { Tables } from "@/components/Tables";

export default function ContactAdminPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { theme } = useTheme();

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
      fetchMessages();
    } catch (err) {
      toast.error("An error occurred while deleting the message.");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateMessage(id, updatedData);
      toast.success("Message has been updated successfully.");
      fetchMessages();
      return true;
    } catch (err) {
      toast.error("An error occurred while updating the message.");
      return false;
    }
  };

  const columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Subject", key: "subject" },
    { header: "Message", key: "message" },
  ];

  return (
    <div className="container mx-auto py-2">
      <Toaster position="top-center" richColors />
      <Card className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-4 rounded-2xl border border-gray-300 dark:border-white/30 transition-colors duration-700">
        <CardHeader>
          <CardTitle>
            <span
              className={cn(
                "w-1/4 bg-clip-text text-transparent text-left font-semibold",
                theme?.isGradient ? theme?.primaryGradient : "",
              )}
            >
              Contact Messages
            </span>
          </CardTitle>
          <CardDescription>
            View and manage messages submitted through your contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tables
            columns={columns}
            data={messages}
            loading={loading}
            error={error}
            themes={theme}
            renderActions={(message) => (
              <ActionsCell
                message={message}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                themes={theme}
              />
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
