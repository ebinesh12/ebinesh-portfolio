"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  FileText,
  MousePointerClick,
  Share2,
  Plus,
  Trash2,
  Save,
  Loader2,
  LayoutTemplate,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { heroSchema } from "@/services/schema";
import { heroValues } from "@/utils/constant";

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

export default function EditHero({ themes }) {
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues: heroValues,
  });

  const {
    fields: actionFields,
    append: appendAction,
    remove: removeAction,
    move: moveAction, // Destructure move for reordering
  } = useFieldArray({
    control,
    name: "actions",
  });

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
    move: moveSocialLink, // Destructure move for reordering
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

  // Fetch Data
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get("/api/v1/hero");
        if (response.data.success) {
          reset(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch hero data.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, [reset]);

  // Error Handling
  useEffect(() => {
    const allErrors = [
      ...Object.values(errors.personalInfo ?? {}),
      ...Object.values(errors.about ?? {}),
      ...(errors.actions ?? []),
      ...(errors.socialLinks ?? []),
    ];

    if (allErrors.length > 0) {
      toast.error("Please check the form for errors");
    }
  }, [errors]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/hero", data);
    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Hero section updated successfully!",
      error: "Failed to update hero section.",
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
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Hero Section</CardTitle>
              <CardDescription>
                Manage the main introductory section of your portfolio.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={["personal"]}
          className="space-y-4"
        >
          {/* 1. Personal Info Section */}
          <AccordionItem value="personal" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <User className="w-5 h-5 text-blue-500" />
                  Personal Information
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="greeting">Greeting Text</Label>
                    <Input
                      id="greeting"
                      placeholder="e.g. Hello, I'm"
                      {...register("personalInfo.greeting")}
                      className="dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      {...register("personalInfo.name")}
                      className="dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      {...register("personalInfo.title")}
                      className="dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Status / Availability</Label>
                    <Input
                      id="availability"
                      placeholder="e.g. Open to work"
                      {...register("personalInfo.availability")}
                      className="dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="photo">Profile Image URL</Label>
                    <Input
                      id="photo"
                      {...register("personalInfo.photo")}
                      placeholder="/images/profile.jpg or https://..."
                      className="dark:bg-zinc-900 font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use the uploaded database image.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 2. About Summary */}
          <AccordionItem value="about" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  About Summary
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="summary">Short Bio</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    className="resize-none dark:bg-zinc-900 leading-relaxed"
                    placeholder="A brief introduction displayed on the hero section..."
                    {...register("about.summary")}
                  />
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 3. Action Buttons */}
          <AccordionItem value="actions" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <MousePointerClick className="w-5 h-5 text-emerald-500" />
                  Call to Actions
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {actionFields.map((action, index) => (
                    <div
                      key={action.id}
                      className="relative grid gap-4 p-4 pt-10 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-zinc-900/50 group hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                    >
                      {/* Action Toolbar */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 z-10 bg-white dark:bg-zinc-900 p-1 rounded-md border border-gray-200 dark:border-white/10 shadow-sm">
                        <div className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-2">
                          BTN {index + 1}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                          disabled={index === 0}
                          onClick={() => moveAction(index, index - 1)}
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                          disabled={index === actionFields.length - 1}
                          onClick={() => moveAction(index, index + 1)}
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                        <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-red-500"
                          onClick={() => removeAction(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Display Text</Label>
                          <Input
                            {...register(`actions.${index}.text`)}
                            placeholder="e.g. Contact Me"
                            className="h-9 bg-white dark:bg-zinc-950"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Link / URL</Label>
                          <Input
                            {...register(`actions.${index}.href`)}
                            placeholder="#contact or https://..."
                            className="h-9 bg-white dark:bg-zinc-950"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">
                            Button ID (Internal)
                          </Label>
                          <Input
                            {...register(`actions.${index}.id`)}
                            placeholder="e.g. contact"
                            className="h-9 bg-white dark:bg-zinc-950"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">
                            Icon Class (FontAwesome)
                          </Label>
                          <Input
                            {...register(`actions.${index}.icon`)}
                            placeholder="fas fa-envelope"
                            className="h-9 bg-white dark:bg-zinc-950 font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendAction({ id: "", text: "", href: "", icon: "" })
                    }
                    className="w-full border-dashed py-6 text-muted-foreground hover:text-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add New Action Button
                  </Button>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 4. Social Links */}
          <AccordionItem value="socials" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <Share2 className="w-5 h-5 text-cyan-500" />
                  Social Media Links
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {socialLinkFields.map((link, index) => (
                    <div
                      key={link.id}
                      className="relative flex flex-col pt-10 md:pt-4 md:flex-row gap-4 items-start md:items-end p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
                    >
                      {/* Action Toolbar */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 z-10 bg-gray-50 dark:bg-zinc-950 p-1 rounded-md border border-gray-200 dark:border-white/10 shadow-sm">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                          disabled={index === 0}
                          onClick={() => moveSocialLink(index, index - 1)}
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-blue-500 disabled:opacity-30"
                          disabled={index === socialLinkFields.length - 1}
                          onClick={() => moveSocialLink(index, index + 1)}
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                        <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-red-500"
                          onClick={() => removeSocialLink(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow w-full">
                        <div className="space-y-2">
                          <Label className="text-xs">Platform Name</Label>
                          <Input
                            {...register(`socialLinks.${index}.name`)}
                            placeholder="e.g. GitHub"
                            className="h-9 bg-gray-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Profile URL</Label>
                          <Input
                            {...register(`socialLinks.${index}.url`)}
                            placeholder="https://github.com/..."
                            className="h-9 bg-gray-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Icon Class</Label>
                          <Input
                            {...register(`socialLinks.${index}.icon`)}
                            placeholder="fab fa-github"
                            className="font-mono text-xs h-9 bg-gray-50 dark:bg-zinc-950"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendSocialLink({ name: "", url: "", icon: "" })
                    }
                    className="w-full border-dashed py-6 text-muted-foreground hover:text-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Social Link
                  </Button>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

        {/* Sticky Footer Actions */}
        <div className="sticky bottom-4 mt-6 flex justify-end z-40">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "shadow-lg min-w-[150px] text-white rounded-full font-semibold transition-all duration-300",
              themes?.isGradient
                ? themes?.primaryGradient
                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white",
            )}
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
