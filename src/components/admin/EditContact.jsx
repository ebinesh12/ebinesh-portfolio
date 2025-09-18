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
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { linksSchema } from "@/services/schema";
import { linksValues } from "@/utils/constant";


export default function EditContact({ themes }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(linksSchema),
    defaultValues: linksValues,
  });

  const {
    fields: methodFields,
    append: appendMethod,
    remove: removeMethod,
  } = useFieldArray({
    control,
    name: "connect.methods",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get("/api/v1/link");
        if (response.data.success) {
          reset(response.data.data); // Populate form with fetched data
        } else {
          toast.error(response.data.message || "Failed to fetch contact data.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching contact data.");
        console.error("Fetch error:", error);
      }
    };
    fetchContactData();
  }, [reset]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/link", data);

    toast.promise(promise, {
      loading: "Saving contact info...",
      success: "Contact section updated!",
      error: "Failed to update contact section.",
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-gray-300 dark:border-white/20 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
          <span
            className={cn(
              "md:w-1/4 bg-clip-text text-transparent text-left font-semibold",
              themes?.isGradient ? themes?.primaryGradient : ""
            )}
          >
            Edit Contact Section
          </span>
        </CardTitle>
        <CardDescription>
          Manage your contact information and links.
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
                  "text-lg font-semibold bg-clip-text text-transparent",
                  themes?.isGradient ? themes?.primaryGradient : ""
                )}
              >
                Connect Methods
              </h3>
              <Button
                type="button"
                onClick={() => appendMethod({ type: "", value: "", href: "", icon: "" })}
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

            <div>
              <Label>Connect Section Title</Label>
              <Input {...register("connect.title")} />
              {errors.connect?.title && <p className="text-red-500 text-sm mt-1">{errors.connect.title.message}</p>}
            </div>
            
            {methodFields.map((method, index) => (
              <div
                key={method.id}
                className="flex items-end gap-2 p-4 border rounded-md"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
                  <div>
                    <Label>Type</Label>
                    <Input
                      {...register(`connect.methods.${index}.type`)}
                      placeholder="e.g., Email"
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input
                      {...register(`connect.methods.${index}.value`)}
                      placeholder="e.g., Connect with me"
                    />
                  </div>
                  <div>
                    <Label>Href</Label>
                    <Input
                      {...register(`connect.methods.${index}.href`)}
                      placeholder="e.g., mailto:..."
                    />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Input
                      {...register(`connect.methods.${index}.icon`)}
                      placeholder="e.g., fas fa-envelope"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  className={cn(
                    "text-white",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
                  )}
                  size="icon"
                  onClick={() => removeMethod(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
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