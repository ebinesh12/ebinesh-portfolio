"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageActions } from "./MessageActions";
import { SearchX } from "lucide-react";

export function ContactTable({ data, loading, onDelete, onUpdate }) {
  // Loading State
  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-[30%]" />
                <Skeleton className="h-3 w-[60%]" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  // Empty State (No Data or No Search Results)
  if (!loading && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 mb-4">
          <SearchX className="h-8 w-8 text-zinc-400" />
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          No messages found
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm">
          We couldn&apos;t find any messages matching your current filters. Try
          clearing the search or refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px]">Sender</TableHead>
            <TableHead className="w-[200px]">Subject</TableHead>
            <TableHead className="min-w-[300px]">Message Preview</TableHead>
            <TableHead className="w-[100px] text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              className="group border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors"
            >
              {/* Sender Info */}
              <TableCell className="align-top py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {row.name}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]">
                    {row.email}
                  </span>
                </div>
              </TableCell>

              {/* Subject */}
              <TableCell className="align-top py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  {row.subject || "No Subject"}
                </span>
              </TableCell>

              {/* Message Content */}
              <TableCell className="align-top py-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                  {row.message}
                </p>
              </TableCell>

              {/* Actions */}
              <TableCell className="align-top py-4 text-center">
                <MessageActions
                  message={row}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
