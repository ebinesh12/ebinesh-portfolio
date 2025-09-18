"use client";

import { useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { experienceSchema } from "@/services/schema";
import { experienceValues } from "@/utils/constant";

export default function EditExperience({ themes }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: experienceValues,
  });

  const {
    fields: jobFields,
    append: appendJob,
    remove: removeJob,
  } = useFieldArray({
    control,
    name: "jobs",
  });

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get("/api/v1/experience");
        if (response.data.success) {
          reset(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch experience data.");
        console.error("Fetch error:", error);
      }
    };
    fetchExperienceData();
  }, [reset]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/experience", data);
    toast.promise(promise, {
      loading: "Saving experience...",
      success: "Experience section updated successfully!",
      error: "Failed to update experience.",
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
            Edit Experience Section
          </span>
        </CardTitle>
        <CardDescription>
          Detail your professional journey and roles.
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
                Jobs
              </h3>
              <Button
                type="button"
                onClick={() => appendJob({ role: "", company: "", duration: "", responsibilities: [] })}
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

            {jobFields.map((job, index) => (
              <div
                key={job.id}
                className="space-y-4 p-4 border rounded-md relative"
              >
                <Button
                  type="button"
                  size="icon"
                  className={cn(
                    "absolute top-2 right-2 h-7 w-7 text-white",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
                  )}
                  onClick={() => removeJob(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Role</Label>
                    <Input {...register(`jobs.${index}.role`)} />
                     {errors.jobs?.[index]?.role && <p className="text-red-500 text-sm mt-1">{errors.jobs[index].role.message}</p>}
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input {...register(`jobs.${index}.company`)} />
                     {errors.jobs?.[index]?.company && <p className="text-red-500 text-sm mt-1">{errors.jobs[index].company.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label>Duration</Label>
                    <Input {...register(`jobs.${index}.duration`)} />
                     {errors.jobs?.[index]?.duration && <p className="text-red-500 text-sm mt-1">{errors.jobs[index].duration.message}</p>}
                  </div>
                </div>
                <div>
                  <Label>Responsibilities (one per line)</Label>
                  <Controller
                    name={`jobs.${index}.responsibilities`}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        value={Array.isArray(field.value) ? field.value.join("\n") : ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value ? value.split("\n") : []);
                        }}
                        rows={4}
                      />
                    )}
                  />
                  {errors.jobs?.[index]?.responsibilities && <p className="text-red-500 text-sm mt-1">{errors.jobs[index].responsibilities.message}</p>}
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