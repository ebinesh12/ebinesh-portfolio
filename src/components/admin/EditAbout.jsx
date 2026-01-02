"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Info,
  BookOpen,
  GraduationCap,
  Save,
  Loader2,
  Plus,
  Trash2,
  FileUser,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { aboutSchema } from "@/services/schema";
import { aboutValues } from "@/utils/constant";

// Import API service functions
import { fetchAboutData, updateAboutData } from "@/services/AboutService";

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

export default function EditAbout({ themes }) {
  const queryClient = useQueryClient();

  // 1. React Hook Form Setup
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues: aboutValues,
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
    move: moveEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  // 2. Fetch Data using useQuery
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Prevent form reset on window switch
  });

  // 3. Sync fetched data with Form
  useEffect(() => {
    if (aboutData) {
      reset(aboutData);
    }
  }, [aboutData, reset]);

  // 4. Mutation for Saving Data
  const mutation = useMutation({
    mutationFn: updateAboutData,
    onSuccess: () => {
      // Invalidate query to ensure fresh data (optional for simple forms, but good practice)
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });

  // 5. Handle Form Submission
  const onSubmit = async (data) => {
    const promise = mutation.mutateAsync(data);

    toast.promise(promise, {
      loading: "Saving changes...",
      success: "About section updated successfully!",
      error: (err) =>
        err.response?.data?.message || "Failed to update about section.",
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
              <FileUser className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">About Section</CardTitle>
              <CardDescription>
                Manage your biography, story, and educational background.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={["general", "story"]}
          className="space-y-4"
        >
          {/* 1. General Information */}
          <AccordionItem value="general" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <Info className="w-5 h-5 text-indigo-500" />
                  General Information
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
                      placeholder="e.g. Discover"
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
                      placeholder="e.g. About Me"
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
                      placeholder="Brief subtitle for the section..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Display Icon (Class/String)</Label>
                    <Input
                      id="icon"
                      {...register("icon")}
                      placeholder="fas fa-user-graduate"
                      className="dark:bg-zinc-900 font-mono text-sm"
                    />
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 2. Story Section */}
          <AccordionItem value="story" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  My Story
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="storyTitle">Story Heading</Label>
                    <Input
                      id="storyTitle"
                      {...register("story.title")}
                      className="dark:bg-zinc-900"
                    />
                    {errors.story?.title && (
                      <p className="text-red-500 text-xs">
                        {errors.story.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storyParagraphs">Biography Content</Label>
                    <div className="text-xs text-muted-foreground mb-1">
                      Tip: Press <strong>Enter</strong> to create a new
                      paragraph block in the UI.
                    </div>
                    <Controller
                      name="story.paragraphs"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          id="storyParagraphs"
                          className="min-h-[200px] dark:bg-zinc-900 leading-relaxed"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join("\n")
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(e.target.value.split("\n"))
                          }
                          placeholder="Write your bio here..."
                        />
                      )}
                    />
                    {errors.story?.paragraphs && (
                      <p className="text-red-500 text-xs">
                        {errors.story.paragraphs.message}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 3. Education Section */}
          <AccordionItem value="education" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  Education Timeline
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {educationFields.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="relative p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-zinc-900/50 group"
                    >
                      {/* Action Toolbar */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 z-10">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={index === 0}
                          onClick={() => moveEducation(index, index - 1)}
                          className="h-8 w-8 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={index === educationFields.length - 1}
                          onClick={() => moveEducation(index, index + 1)}
                          className="h-8 w-8 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1"></div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase text-muted-foreground">
                            Degree / Certificate
                          </Label>
                          <Input
                            {...register(`education.${index}.degree`)}
                            className="bg-white dark:bg-zinc-950"
                            placeholder="e.g. Bachelor of Science"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase text-muted-foreground">
                            Institution
                          </Label>
                          <Input
                            {...register(`education.${index}.institution`)}
                            className="bg-white dark:bg-zinc-950"
                            placeholder="e.g. Harvard University"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase text-muted-foreground">
                            Duration / Year
                          </Label>
                          <Input
                            {...register(`education.${index}.duration`)}
                            className="bg-white dark:bg-zinc-950"
                            placeholder="e.g. 2018 - 2022"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-xs font-medium uppercase text-muted-foreground">
                            Description
                          </Label>
                          <Textarea
                            {...register(`education.${index}.description`)}
                            className="bg-white dark:bg-zinc-950 resize-none"
                            rows={3}
                            placeholder="Brief details about your major or achievements..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendEducation({
                        degree: "",
                        institution: "",
                        duration: "",
                        description: "",
                      })
                    }
                    className="w-full border-dashed py-6 text-muted-foreground hover:text-primary mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add New Education
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
