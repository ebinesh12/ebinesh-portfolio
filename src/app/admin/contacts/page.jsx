"use client";

import { useState, useEffect, useMemo } from "react";
import {
  getMessages,
  deleteMessage,
  updateMessage,
} from "@/services/contactService";
import { toast } from "sonner";
import { ContactTable } from "./ContactTable"; // Imported from file below
import { Inbox, Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ContactAdminPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to fetch messages.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMessages();
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      toast.success("Message moved to trash.");
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      toast.error("Could not delete message.");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateMessage(id, updatedData);
      toast.success("Message updated successfully.");
      // Optimistic update
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, ...updatedData } : msg)),
      );
      return true;
    } catch (err) {
      toast.error("Could not update message.");
      return false;
    }
  };

  // Search Logic
  const filteredMessages = useMemo(() => {
    if (!searchQuery) return messages;
    const lowerQuery = searchQuery.toLowerCase();
    return messages.filter(
      (msg) =>
        msg.name?.toLowerCase().includes(lowerQuery) ||
        msg.email?.toLowerCase().includes(lowerQuery) ||
        msg.subject?.toLowerCase().includes(lowerQuery),
    );
  }, [messages, searchQuery]);

  return (
    <div className="space-y-6 p-2 md:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Messages
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage inquiries and contacts from your portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="h-9"
          >
            <RefreshCcw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <div className="flex items-center justify-center h-9 px-3 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            <Inbox className="mr-2 h-4 w-4" />
            {messages.length} Total
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <CardHeader className="p-4 md:p-6 border-b border-zinc-100 dark:border-zinc-800/50">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold">Inbox</CardTitle>
              <CardDescription>
                Viewing {filteredMessages.length} of {messages.length} messages
              </CardDescription>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <Input
                placeholder="Search by name, email, or subject..."
                className="pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ContactTable
            data={filteredMessages}
            loading={loading}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
}
