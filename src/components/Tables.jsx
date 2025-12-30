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
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export function Tables({ columns, data, loading, renderActions }) {
  // Loading State
  if (loading) {
    return (
      <div className="p-4">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (!loading && data.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
          <AlertCircle className="h-6 w-6 text-neutral-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
          No messages found
        </h3>
        <p className="text-sm text-neutral-500">
          Your inbox is currently empty.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader className="bg-neutral-50 dark:bg-neutral-900">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="whitespace-nowrap font-medium text-neutral-500 dark:text-neutral-400"
              >
                {column.header}
              </TableHead>
            ))}
            {renderActions && (
              <TableHead className="w-[100px] text-right font-medium text-neutral-500 dark:text-neutral-400">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              className="group border-b border-neutral-100 hover:bg-neutral-50/50 dark:border-neutral-800 dark:hover:bg-neutral-900/50"
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={cn(
                    "py-4 text-sm font-medium text-neutral-700 dark:text-neutral-300",
                    column.key === "message"
                      ? "max-w-[300px] truncate text-neutral-500"
                      : "",
                  )}
                >
                  {row[column.key]}
                </TableCell>
              ))}
              {renderActions && (
                <TableCell className="text-right">
                  {renderActions(row)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
