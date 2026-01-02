"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Cpu,
  Layers,
  Palette,
  Plus,
  Trash2,
  Save,
  Loader2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { skillsSchema } from "@/services/schema";
import { skillsValues } from "@/utils/constant";

// Import API service functions
import { fetchSkillsData, updateSkillsData } from "@/services/SkillService";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// --- Sub-Component: Skills List ---
function SkillsList({ control, catIndex, register }) {
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
    move: moveSkill,
  } = useFieldArray({
    control,
    name: `categories.${catIndex}.items`,
  });

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-2">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Skills List ({skillFields.length})
        </h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            appendSkill({
              name: "",
              level: "Intermediate",
              icon: "",
              color: "",
            })
          }
          className="h-8 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" /> Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {skillFields.map((item, itemIndex) => (
          <div
            key={item.id}
            className="relative flex flex-col pt-12 md:pt-4 md:flex-row gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-sm transition-all hover:border-blue-300 dark:hover:border-blue-700 group"
          >
            {/* --- Action Buttons (Top Right) --- */}
            <div className="absolute top-2 right-2 flex gap-1 z-10 bg-white dark:bg-zinc-950 p-1 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                disabled={itemIndex === 0}
                onClick={() => moveSkill(itemIndex, itemIndex - 1)}
              >
                <ArrowUp className="w-3 h-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                disabled={itemIndex === skillFields.length - 1}
                onClick={() => moveSkill(itemIndex, itemIndex + 1)}
              >
                <ArrowDown className="w-3 h-3" />
              </Button>
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1 self-center" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-red-500"
                onClick={() => removeSkill(itemIndex)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Skill Name
                </Label>
                <Input
                  {...register(
                    `categories.${catIndex}.items.${itemIndex}.name`,
                  )}
                  placeholder="e.g. React"
                  className="h-9 bg-gray-50 dark:bg-white/5"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Proficiency
                </Label>
                <Input
                  {...register(
                    `categories.${catIndex}.items.${itemIndex}.level`,
                  )}
                  placeholder="e.g. Advanced"
                  className="h-9 bg-gray-50 dark:bg-white/5"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Icon Class
                </Label>
                <Input
                  {...register(
                    `categories.${catIndex}.items.${itemIndex}.icon`,
                  )}
                  placeholder="fab fa-react"
                  className="h-9 bg-gray-50 dark:bg-white/5 font-mono text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Color Class
                </Label>
                <div className="flex gap-2">
                  <Input
                    {...register(
                      `categories.${catIndex}.items.${itemIndex}.color`,
                    )}
                    placeholder="text-blue-500"
                    className="h-9 bg-gray-50 dark:bg-white/5 font-mono text-xs"
                  />
                  {/* Visual Color Preview */}
                  <div className="w-9 h-9 rounded-md border border-gray-200 dark:border-white/10 flex items-center justify-center bg-gray-50 dark:bg-zinc-900 shrink-0">
                    <Palette className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {skillFields.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl text-gray-500 text-sm">
            No skills added to this category yet.
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main Component ---
export default function EditSkills({ themes }) {
  const queryClient = useQueryClient();

  // 1. React Hook Form Setup
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: skillsValues,
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
    move: moveCategory,
  } = useFieldArray({
    control,
    name: "categories",
  });

  // 2. Fetch Data using useQuery
  const { data: skillsData, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkillsData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // 3. Sync fetched data with Form
  useEffect(() => {
    if (skillsData) {
      reset(skillsData);
    }
  }, [skillsData, reset]);

  // 4. Mutation for Saving Data
  const mutation = useMutation({
    mutationFn: updateSkillsData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  // 5. Handle Form Submission
  const onSubmit = async (data) => {
    const promise = mutation.mutateAsync(data);

    toast.promise(promise, {
      loading: "Saving skills...",
      success: "Skills section updated successfully!",
      error: "Failed to update skills.",
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
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Skills & Tech Stack</CardTitle>
              <CardDescription>
                Categorize and list your technical proficiencies.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={["general"]}
          className="space-y-4"
        >
          {/* 1. General Settings */}
          <AccordionItem value="general" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  General Section Info
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="superTitle">Super Title</Label>
                    <Input
                      {...register("superTitle")}
                      placeholder="e.g. Explore My"
                      className="dark:bg-zinc-900"
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
                      {...register("title")}
                      placeholder="e.g. Skills"
                      className="dark:bg-zinc-900"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      {...register("description")}
                      placeholder="Brief overview..."
                      className="dark:bg-zinc-900"
                    />
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 2. Categories Wrapper */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Skill Categories
              </h3>
              <Button
                type="button"
                onClick={() =>
                  appendCategory({
                    title: "",
                    icon: "",
                    items: [
                      {
                        name: "New Skill",
                        level: "Intermediate",
                        icon: "fab fa-react",
                        color: "text-blue-500",
                      },
                    ],
                  })
                }
                className={cn(
                  "text-white shadow-md transition-transform active:scale-95",
                  themes?.isGradient
                    ? themes?.primaryGradient
                    : "bg-blue-600 hover:bg-blue-700",
                )}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Category
              </Button>
            </div>

            {categoryFields.map((cat, catIndex) => (
              <AccordionItem
                key={cat.id}
                value={`cat-${cat.id}`}
                className="border-none"
              >
                <Card className="border-gray-200 dark:border-white/10 overflow-hidden bg-gray-50/30 dark:bg-zinc-900/30">
                  <div className="flex items-center w-full px-6 py-2 border-b border-gray-100 dark:border-white/5">
                    {/* Header with Title and Actions */}
                    <div className="flex items-center justify-between w-full">
                      <AccordionTrigger className="flex-1 hover:no-underline">
                        <span className="font-semibold text-lg text-gray-700 dark:text-gray-200">
                          {/* Fallback title if input is empty */}
                          Category {catIndex + 1}
                        </span>
                      </AccordionTrigger>

                      <div
                        className="flex items-center gap-1 ml-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={catIndex === 0}
                          onClick={() => moveCategory(catIndex, catIndex - 1)}
                          className="h-8 w-8 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={catIndex === categoryFields.length - 1}
                          onClick={() => moveCategory(catIndex, catIndex + 1)}
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
                          onClick={() => removeCategory(catIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <AccordionContent className="px-6 pb-6 pt-6">
                    {/* Category Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label>Category Title</Label>
                        <Input
                          {...register(`categories.${catIndex}.title`)}
                          placeholder="e.g. Frontend Development"
                          className="bg-white dark:bg-zinc-950"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category Icon</Label>
                        <Input
                          {...register(`categories.${catIndex}.icon`)}
                          placeholder="fas fa-code"
                          className="bg-white dark:bg-zinc-950 font-mono text-sm"
                        />
                      </div>
                    </div>

                    {/* Nested Skills List */}
                    <div className="bg-gray-100/50 dark:bg-zinc-950/50 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-white/5">
                      <SkillsList
                        control={control}
                        catIndex={catIndex}
                        register={register}
                      />
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </div>
        </Accordion>

        {/* Sticky Save Button */}
        <div className="sticky bottom-4 mt-8 flex justify-end z-40">
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
