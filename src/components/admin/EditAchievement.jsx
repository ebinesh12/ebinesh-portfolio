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
import { achievementsSchema } from "@/services/schema";
import { achievementsValues } from "@/utils/constant";

export default function EditAchievements({ themes }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(achievementsSchema),
    defaultValues: achievementsValues,
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
    const fetchAchievementsData = async () => {
      try {
        const response = await axios.get("/api/v1/achievement");
        if (response.data.success) {
          reset(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch achievements data.");
        console.error("Fetch error:", error);
      }
    };
    fetchAchievementsData();
  }, [reset]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/achievement", data);

    toast.promise(promise, {
      loading: "Saving achievements...",
      success: "Achievements section updated successfully!",
      error: "Failed to update achievements.",
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
            Edit Achievements Section
          </span>
        </CardTitle>
        <CardDescription>
          Highlight your key accomplishments and awards.
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
                Achievements
              </h3>
              <Button
                type="button"
                onClick={() => appendItem({ icon: "", title: "", description: "" })}
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
                    "absolute top-2 right-2 h-7 w-7 text-white",
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
                  <div className="md:col-span-2">
                    <Label>Icon</Label>
                    <Input
                      {...register(`items.${index}.icon`)}
                      placeholder="e.g., fa-solid fa-trophy"
                    />
                    {errors.items?.[index]?.icon && <p className="text-red-500 text-sm mt-1">{errors.items[index].icon.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label>Title</Label>
                    <Input
                      {...register(`items.${index}.title`)}
                      placeholder="e.g., Programming Contest Winner"
                    />
                    {errors.items?.[index]?.title && <p className="text-red-500 text-sm mt-1">{errors.items[index].title.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea {...register(`items.${index}.description`)} />
                    {errors.items?.[index]?.description && <p className="text-red-500 text-sm mt-1">{errors.items[index].description.message}</p>}
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