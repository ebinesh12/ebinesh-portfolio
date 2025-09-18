"use client";

import { useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { certificatesSchema } from "@/services/schema";
import { certificatesValues } from "@/utils/constant";

export default function EditCertificates({ themes }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(certificatesSchema),
    defaultValues: certificatesValues,
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    const fetchCertificatesData = async () => {
      try {
        const response = await axios.get("/api/v1/certificate");
        if (response.data.success) {
          reset(response.data.data); // Use reset to populate the form
        }
      } catch (error) {
        toast.error("Failed to fetch certificates data.");
        console.error("Fetch error:", error);
      }
    };
    fetchCertificatesData();
  }, [reset]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/certificate", data);

    toast.promise(promise, {
      loading: "Saving certificates...",
      success: "Certificates section updated!",
      error: "Failed to update certificates.",
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-4 rounded-2xl border border-gray-300 dark:border-white/30 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
          <span
            className={cn(
              "md:w-1/4 bg-clip-text text-transparent text-left font-semibold",
              themes?.isGradient ? themes?.primaryGradient : ""
            )}
          >
            Edit Certificates Section
          </span>
        </CardTitle>
        <CardDescription>
          Showcase your professional certifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Super Title</Label>
            <Input {...register("superTitle")} />
            {errors.superTitle && <p className="text-red-500 text-sm mt-1">{errors.superTitle.message}</p>}

            <Label>Title</Label>
            <Input {...register("title")} />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}

            <Label>Description</Label>
            <Input {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3
                className={cn(
                  "md:w-1/4 text-lg font-semibold bg-clip-text text-transparent",
                  themes?.isGradient ? themes?.primaryGradient : ""
                )}
              >
                Certificates
              </h3>
              <Button
                type="button"
                onClick={() =>
                  appendItem({
                    title: "",
                    issuer: "",
                    description: "",
                    date: "",
                    pdf: "",
                  })
                }
                className={cn(
                  "p-3 rounded-md font-bold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                  themes?.isGradient
                    ? themes?.primaryGradient
                    : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
                )}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {itemFields.map((item, index) => (
              <div
                key={item.id}
                className="space-y-4 p-4 border rounded-md relative"
              >
                <Button
                  type="button"
                  className={cn(
                    "absolute top-2 right-2 h-7 w-7",
                    "text-white",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
                  )}
                  size="icon"
                  onClick={() => removeItem(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input {...register(`items.${index}.title`)} />
                     {errors.items?.[index]?.title && <p className="text-red-500 text-sm mt-1">{errors.items[index].title.message}</p>}
                  </div>
                  <div>
                    <Label>Issuer</Label>
                    <Input {...register(`items.${index}.issuer`)} />
                     {errors.items?.[index]?.issuer && <p className="text-red-500 text-sm mt-1">{errors.items[index].issuer.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea {...register(`items.${index}.description`)} />
                     {errors.items?.[index]?.description && <p className="text-red-500 text-sm mt-1">{errors.items[index].description.message}</p>}
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      {...register(`items.${index}.date`)}
                      placeholder="e.g., June 2024"
                    />
                     {errors.items?.[index]?.date && <p className="text-red-500 text-sm mt-1">{errors.items[index].date.message}</p>}
                  </div>
                  <div>
                    <Label>PDF Link</Label>
                    <Input
                      {...register(`items.${index}.pdf`)}
                      placeholder="https://example.com/certificate.pdf"
                    />
                     {errors.items?.[index]?.pdf && <p className="text-red-500 text-sm mt-1">{errors.items[index].pdf.message}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            className={cn(
              "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
              themes?.isGradient
                ? themes?.primaryGradient
                : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
            )}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}