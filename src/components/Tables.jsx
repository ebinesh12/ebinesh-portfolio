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

export function Tables({
  columns,
  data,
  loading,
  error,
  themes,
  renderActions,
}) {
  const renderSkeleton = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        {columns.map((column) => (
          <TableCell key={column.key}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
        {renderActions && (
          <TableCell>
            <Skeleton className="h-8 w-20" />
          </TableCell>
        )}
      </TableRow>
    ));

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-gray-100/40 dark:hover:bg-white/10">
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={cn(
                "font-semibold bg-clip-text text-transparent",
                themes?.primaryGradient ?? "text-gray-800 dark:text-white",
              )}
            >
              {column.header}
            </TableHead>
          ))}
          {renderActions && (
            <TableHead
              className={cn(
                "font-semibold text-center bg-clip-text text-transparent",
                themes?.primaryGradient ?? "text-gray-800 dark:text-white",
              )}
            >
              Actions
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          renderSkeleton()
        ) : error ? (
          <TableRow>
            <TableCell
              colSpan={columns.length + (renderActions ? 1 : 0)}
              className="text-center text-red-500"
            >
              {error}
            </TableCell>
          </TableRow>
        ) : data.length > 0 ? (
          data.map((row) => (
            <TableRow
              key={row.id}
              className="hover:bg-gray-100/40 dark:hover:bg-white/10 transition-colors duration-300"
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={`py-3 ${
                    column.key === "message" ? "max-w-xs truncate" : ""
                  }`}
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
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length + (renderActions ? 1 : 0)}
              className="text-center"
            >
              No data found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
