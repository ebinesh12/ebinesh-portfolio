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
import { projectsSchema } from "@/services/schema";
import { projectsValues } from "@/utils/constant";

export default function EditProjects({ themes }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(projectsSchema),
    defaultValues: projectsValues,
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
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get("/api/v1/project");
        if (response.data.success) {
          reset(response.data.data); // Use reset to populate the form
        }
      } catch (error) {
        toast.error("Failed to fetch projects data.");
        console.error("Fetch error:", error);
      }
    };
    fetchProjectsData();
  }, [reset]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/project", data);

    toast.promise(promise, {
      loading: "Saving projects...",
      success: "Projects section updated!",
      error: "Failed to update projects.",
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
            Edit Projects Section
          </span>
        </CardTitle>
        <CardDescription>
          Manage the projects you want to showcase.
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
                Projects
              </h3>
              <Button
                type="button"
                onClick={() =>
                  appendItem({
                    title: "",
                    description: "",
                    gradient: "",
                    icon: "",
                    github: "",
                    demo: "",
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
                className="space-y-4 p-4 border hover:dark:bg-white/5 dark:border-white/20 rounded-md relative"
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
                  <div>
                    <Label>Title</Label>
                    <Input {...register(`items.${index}.title`)} />
                    {errors.items?.[index]?.title && <p className="text-red-500 text-sm mt-1">{errors.items[index].title.message}</p>}
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Input {...register(`items.${index}.icon`)} />
                    {errors.items?.[index]?.icon && <p className="text-red-500 text-sm mt-1">{errors.items[index].icon.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea {...register(`items.${index}.description`)} />
                    {errors.items?.[index]?.description && <p className="text-red-500 text-sm mt-1">{errors.items[index].description.message}</p>}
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      {...register(`items.${index}.github`)}
                      placeholder="https://github.com/..."
                    />
                     {errors.items?.[index]?.github && <p className="text-red-500 text-sm mt-1">{errors.items[index].github.message}</p>}
                  </div>
                  <div>
                    <Label>Demo URL</Label>
                    <Input
                      {...register(`items.${index}.demo`)}
                      placeholder="https://example.com/..."
                    />
                     {errors.items?.[index]?.demo && <p className="text-red-500 text-sm mt-1">{errors.items[index].demo.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label>Gradient (Tailwind)</Label>
                    <Input
                      {...register(`items.${index}.gradient`)}
                      placeholder="from-blue-500 to-teal-400"
                    />
                     {errors.items?.[index]?.gradient && <p className="text-red-500 text-sm mt-1">{errors.items[index].gradient.message}</p>}
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