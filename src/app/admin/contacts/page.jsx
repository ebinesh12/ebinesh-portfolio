"use client";

import { useState, useEffect } from "react";
import {
  getMessages,
  deleteMessage,
  updateMessage,
} from "@/services/contactService";
import { Toaster, toast } from "sonner";
import { ActionsCell } from "@/components/Actions";
import { Tables } from "@/components/Tables";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Inbox } from "lucide-react";

export default function ContactAdminPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
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
      toast.success("Message deleted.");
      fetchMessages();
    } catch (err) {
      toast.error("Could not delete message.");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateMessage(id, updatedData);
      toast.success("Message updated.");
      fetchMessages();
      return true;
    } catch (err) {
      toast.error("Could not update message.");
      return false;
    }
  };

  const columns = [
    { header: "Sender", key: "name" },
    { header: "Email", key: "email" },
    { header: "Subject", key: "subject" },
    { header: "Message", key: "message" },
  ];

  return (
    <div className="space-y-6">
      <Toaster position="top-center" richColors />

      {/* Header / Stats */}
      <div className="flex items-center justify-between">
        <div>
          {/* The Layout already has a title, but this context is specific to the table */}
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Inbox
          </h2>
          <p className="text-sm text-neutral-500">Manage user inquiries.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1 text-sm font-medium dark:border-neutral-800 dark:bg-neutral-900">
          <Inbox className="h-4 w-4 text-neutral-500" />
          <span>{messages.length} Messages</span>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <CardContent className="p-0">
          <Tables
            columns={columns}
            data={messages}
            loading={loading}
            renderActions={(message) => (
              <ActionsCell
                message={message}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
