"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Save,
  Loader2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { experienceSchema } from "@/services/schema";
import { experienceValues } from "@/utils/constant";

// Import API service functions
import {
  fetchExperienceData,
  updateExperienceData,
} from "@/services/ExperienceService";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function EditExperience({ themes }) {
  const queryClient = useQueryClient();

  // 1. React Hook Form Setup
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: experienceValues,
  });

  const {
    fields: jobFields,
    append: appendJob,
    remove: removeJob,
    move: moveJob,
  } = useFieldArray({
    control,
    name: "jobs",
  });

  // 2. Fetch Data using useQuery
  const { data: experienceData, isLoading } = useQuery({
    queryKey: ["experience"],
    queryFn: fetchExperienceData,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Prevent form reset on window focus
  });

  // 3. Sync fetched data with Form
  useEffect(() => {
    if (experienceData) {
      reset(experienceData);
    }
  }, [experienceData, reset]);

  // 4. Mutation for Saving Data
  const mutation = useMutation({
    mutationFn: updateExperienceData,
    onSuccess: () => {
      // Invalidate query to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
  });

  // 5. Handle Form Submission
  const onSubmit = async (data) => {
    const promise = mutation.mutateAsync(data);

    toast.promise(promise, {
      loading: "Saving experience...",
      success: "Experience section updated successfully!",
      error: (err) => {
        console.error(err);
        return "Failed to update experience.";
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Card */}
      <Card className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-lg text-white",
                themes?.isGradient ? themes?.primaryGradient : "bg-blue-600",
              )}
            >
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Experience Section</CardTitle>
              <CardDescription>
                Manage your professional history and timeline.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={["general", "jobs"]}
          className="space-y-4"
        >
          {/* 1. General Section Info */}
          <AccordionItem value="general" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  General Section Info
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="superTitle">Super Title</Label>
                    <Input
                      id="superTitle"
                      {...register("superTitle")}
                      className="dark:bg-zinc-900"
                      placeholder="e.g. My Journey"
                    />
                    {errors.superTitle && (
                      <p className="text-red-500 text-xs">
                        {errors.superTitle.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Main Title</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      className="dark:bg-zinc-900"
                      placeholder="e.g. Work Experience"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Section Description</Label>
                    <Input
                      id="description"
                      {...register("description")}
                      className="dark:bg-zinc-900"
                      placeholder="Brief overview text..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 2. Job Timeline */}
          <AccordionItem value="jobs" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <Building2 className="w-5 h-5 text-emerald-500" />
                  Job Timeline
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {jobFields.map((job, index) => (
                    <div
                      key={job.id}
                      className="relative p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-zinc-900/50 transition-all hover:border-blue-300 dark:hover:border-blue-700 group"
                    >
                      {/* Action Buttons (Right Top) */}
                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                        {/* Move Up */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={index === 0}
                          onClick={() => moveJob(index, index - 1)}
                          className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>

                        {/* Move Down */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={index === jobFields.length - 1}
                          onClick={() => moveJob(index, index + 1)}
                          className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>

                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

                        {/* Remove */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeJob(index)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-0 md:pr-32">
                        {/* Role */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> Job Role / Title
                          </Label>
                          <Input
                            {...register(`jobs.${index}.role`)}
                            placeholder="e.g. Senior Developer"
                            className="bg-white dark:bg-zinc-950 font-semibold"
                          />
                          {errors.jobs?.[index]?.role && (
                            <p className="text-red-500 text-xs">
                              {errors.jobs[index].role.message}
                            </p>
                          )}
                        </div>

                        {/* Company */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <Building2 className="w-3 h-3" /> Company Name
                          </Label>
                          <Input
                            {...register(`jobs.${index}.company`)}
                            placeholder="e.g. Tech Corp"
                            className="bg-white dark:bg-zinc-950"
                          />
                          {errors.jobs?.[index]?.company && (
                            <p className="text-red-500 text-xs">
                              {errors.jobs[index].company.message}
                            </p>
                          )}
                        </div>

                        {/* Duration */}
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Duration
                          </Label>
                          <Input
                            {...register(`jobs.${index}.duration`)}
                            placeholder="e.g. Jan 2020 - Present"
                            className="bg-white dark:bg-zinc-950"
                          />
                          {errors.jobs?.[index]?.duration && (
                            <p className="text-red-500 text-xs">
                              {errors.jobs[index].duration.message}
                            </p>
                          )}
                        </div>

                        {/* Responsibilities */}
                        <div className="md:col-span-2 space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Key Responsibilities
                          </Label>
                          <div className="text-xs text-muted-foreground/70 mb-1">
                            Tip: Press <strong>Enter</strong> to create a new
                            bullet point.
                          </div>
                          <Controller
                            name={`jobs.${index}.responsibilities`}
                            control={control}
                            render={({ field }) => (
                              <Textarea
                                value={
                                  Array.isArray(field.value)
                                    ? field.value.join("\n")
                                    : ""
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  field.onChange(
                                    value ? value.split("\n") : [],
                                  );
                                }}
                                placeholder="Developed new features..."
                                className="bg-white dark:bg-zinc-950 resize-none leading-relaxed"
                                rows={4}
                              />
                            )}
                          />
                          {errors.jobs?.[index]?.responsibilities && (
                            <p className="text-red-500 text-xs">
                              {errors.jobs[index].responsibilities.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendJob({
                        role: "",
                        company: "",
                        duration: "",
                        responsibilities: [],
                      })
                    }
                    className="w-full border-dashed py-6 text-muted-foreground hover:text-primary mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add New Position
                  </Button>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

        {/* Sticky Save Button */}
        <div className="sticky bottom-4 mt-6 flex justify-end z-40">
          <Button
            className={cn(
              "px-8 py-2 rounded-full font-semibold text-white shadow-xl transition-all duration-300",
              themes?.isGradient
                ? themes?.primaryGradient
                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
            )}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
