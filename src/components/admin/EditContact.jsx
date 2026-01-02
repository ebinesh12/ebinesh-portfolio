"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Contact,
  MessageSquare,
  Link as LinkIcon,
  Type,
  Save,
  Loader2,
  Plus,
  Trash2,
  Globe,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { linksSchema } from "@/services/schema";
import { linksValues } from "@/utils/constant";

// Import API service functions
import { fetchLinkData, updateLinkData } from "@/services/LinkService";

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

export default function EditContact({ themes }) {
  const queryClient = useQueryClient();

  // 1. React Hook Form Setup
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(linksSchema),
    defaultValues: linksValues,
  });

  const {
    fields: methodFields,
    append: appendMethod,
    remove: removeMethod,
    move: moveMethod,
  } = useFieldArray({
    control,
    name: "connect.methods",
  });

  // 2. Fetch Data using useQuery
  const { data: linkData, isLoading } = useQuery({
    queryKey: ["links"], // Unique key for this data
    queryFn: fetchLinkData,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Prevent form reset on window focus
  });

  // 3. Sync fetched data with Form
  useEffect(() => {
    if (linkData) {
      reset(linkData);
    }
  }, [linkData, reset]);

  // 4. Mutation for Saving Data
  const mutation = useMutation({
    mutationFn: updateLinkData,
    onSuccess: () => {
      // Invalidate query to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  // 5. Handle Form Submission
  const onSubmit = async (data) => {
    const promise = mutation.mutateAsync(data);

    toast.promise(promise, {
      loading: "Saving contact info...",
      success: "Contact section updated!",
      error: (err) => {
        console.error(err);
        return "Failed to update contact section.";
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
              <Contact className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Contact Section</CardTitle>
              <CardDescription>
                Manage contact details, social links, and form headers.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={["general", "methods"]}
          className="space-y-4"
        >
          {/* 1. General Section Info */}
          <AccordionItem value="general" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <MessageSquare className="w-5 h-5 text-indigo-500" />
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
                      placeholder="e.g. Get in Touch"
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
                      placeholder="e.g. Contact Me"
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
                      placeholder="Brief text below the title..."
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

          {/* 2. Connection Methods */}
          <AccordionItem value="methods" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <Globe className="w-5 h-5 text-cyan-500" />
                  Connection Methods
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="mb-6 space-y-2">
                  <Label>Subsection Title</Label>
                  <Input
                    {...register("connect.title")}
                    className="dark:bg-zinc-900"
                    placeholder="e.g. Let's Connect"
                  />
                  {errors.connect?.title && (
                    <p className="text-red-500 text-xs">
                      {errors.connect.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {methodFields.map((method, index) => (
                    <div
                      key={method.id}
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
                          onClick={() => moveMethod(index, index - 1)}
                          className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>

                        {/* Move Down */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={index === methodFields.length - 1}
                          onClick={() => moveMethod(index, index + 1)}
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
                          onClick={() => removeMethod(index)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-0 md:pr-32">
                        {/* Type */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <Type className="w-3 h-3" /> Method Name
                          </Label>
                          <Input
                            {...register(`connect.methods.${index}.type`)}
                            placeholder="e.g. Email"
                            className="bg-white dark:bg-zinc-950"
                          />
                        </div>

                        {/* Value */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> Display Value
                          </Label>
                          <Input
                            {...register(`connect.methods.${index}.value`)}
                            placeholder="e.g. user@example.com"
                            className="bg-white dark:bg-zinc-950"
                          />
                        </div>

                        {/* Href */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" /> Link (Href)
                          </Label>
                          <Input
                            {...register(`connect.methods.${index}.href`)}
                            placeholder="mailto:user@example.com"
                            className="bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400"
                          />
                        </div>

                        {/* Icon */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            Icon Class
                          </Label>
                          <Input
                            {...register(`connect.methods.${index}.icon`)}
                            placeholder="fas fa-envelope"
                            className="bg-white dark:bg-zinc-950 font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendMethod({ type: "", value: "", href: "", icon: "" })
                    }
                    className="w-full border-dashed py-6 text-muted-foreground hover:text-primary mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add New Contact Method
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
