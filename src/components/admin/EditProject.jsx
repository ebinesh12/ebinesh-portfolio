"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FolderGit,
  Github,
  ExternalLink,
  Palette,
  FileText,
  Save,
  Loader2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layout,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { projectsSchema } from "@/services/schema";
import { projectsValues } from "@/utils/constant";

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

export default function EditProjects({ themes }) {
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(projectsSchema),
    defaultValues: projectsValues,
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
    move: moveItem, // Destructure move for reordering
  } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get("/api/v1/project");
        if (response.data.success) {
          reset(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch projects data.");
        console.error("Fetch error:", error);
      } finally {
        setIsFetching(false);
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

  if (isFetching) {
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
              <FolderGit className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Projects Portfolio</CardTitle>
              <CardDescription>
                Showcase your work, case studies, and code repositories.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={["general", "items"]}
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
                      placeholder="e.g. My Work"
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
                      placeholder="e.g. Featured Projects"
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

          {/* 2. Projects List */}
          <AccordionItem value="items" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <Layout className="w-5 h-5 text-purple-500" />
                  Projects List
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {itemFields.map((item, index) => (
                    <div
                      key={item.id}
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
                          onClick={() => moveItem(index, index - 1)}
                          className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>

                        {/* Move Down */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={index === itemFields.length - 1}
                          onClick={() => moveItem(index, index + 1)}
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
                          onClick={() => removeItem(index)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-0 md:pr-32">
                        {/* Basic Info */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Project Title
                            </Label>
                            <Input
                              {...register(`items.${index}.title`)}
                              placeholder="e.g. E-Commerce Platform"
                              className="bg-white dark:bg-zinc-950 font-semibold"
                            />
                            {errors.items?.[index]?.title && (
                              <p className="text-red-500 text-xs">
                                {errors.items[index].title.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                              <Palette className="w-3 h-3" /> Gradient / Color
                            </Label>
                            <Input
                              {...register(`items.${index}.gradient`)}
                              placeholder="from-blue-500 to-purple-600"
                              className="bg-white dark:bg-zinc-950 font-mono text-xs"
                            />
                            <p className="text-[10px] text-muted-foreground">
                              Tailwind classes for background gradient
                            </p>
                            {errors.items?.[index]?.gradient && (
                              <p className="text-red-500 text-xs">
                                {errors.items[index].gradient.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Links & Icons */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                <Github className="w-3 h-3" /> Repo URL
                              </Label>
                              <Input
                                {...register(`items.${index}.github`)}
                                placeholder="https://github.com/..."
                                className="bg-white dark:bg-zinc-950"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> Demo URL
                              </Label>
                              <Input
                                {...register(`items.${index}.demo`)}
                                placeholder="https://app.com"
                                className="bg-white dark:bg-zinc-950"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Icon Class (FontAwesome)
                            </Label>
                            <Input
                              {...register(`items.${index}.icon`)}
                              placeholder="fas fa-mobile-alt"
                              className="bg-white dark:bg-zinc-950 font-mono text-xs"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Description
                          </Label>
                          <Textarea
                            {...register(`items.${index}.description`)}
                            placeholder="Brief description of the project features and tech stack..."
                            className="bg-white dark:bg-zinc-950 resize-none leading-relaxed"
                            rows={3}
                          />
                          {errors.items?.[index]?.description && (
                            <p className="text-red-500 text-xs">
                              {errors.items[index].description.message}
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
                      appendItem({
                        title: "",
                        description: "",
                        gradient: "bg-gradient-to-r from-gray-500 to-gray-600",
                        icon: "",
                        github: "",
                        demo: "",
                      })
                    }
                    className="w-full border-dashed py-6 text-muted-foreground hover:text-primary mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add New Project
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
