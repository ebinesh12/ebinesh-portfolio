"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Eye,
  EyeOff,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { heroSchema } from "@/services/schema";
import { heroValues } from "@/utils/constant";

import { fetchHeroData, updateHeroData } from "@/services/HeroService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"; 
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
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues: heroValues,
  });

  const {
    fields: actionFields,
    append: appendAction,
    remove: removeAction,
    move: moveAction,
  } = useFieldArray({ control, name: "actions" });

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
    move: moveSocialLink,
  } = useFieldArray({ control, name: "socialLinks" });

  const { data: heroData, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: fetchHeroData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (heroData) reset(heroData);
  }, [heroData, reset]);

  const mutation = useMutation({
    mutationFn: updateHeroData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
    },
  });

  const onSubmit = async (data) => {
    const promise = mutation.mutateAsync(data);
    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Hero section updated successfully!",
      error: "Failed to update hero section.",
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please check the form for errors");
    }
  }, [errors]);
    
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
            <div className={cn("p-2 rounded-lg text-white", themes?.isGradient ? themes?.primaryGradient : "bg-blue-600")}>
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Hero Section</CardTitle>
              <CardDescription>Manage your introductory profile details.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion type="multiple" defaultValue={["personal", "socials"]} className="space-y-4">
          
          {/* 1. Personal Info Section */}
          <AccordionItem value="personal" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <User className="w-5 h-5 text-blue-500" /> Personal Information
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Greeting Text</Label>
                    <Input {...register("personalInfo.greeting")} className="dark:bg-zinc-900" />
                  </div>
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input {...register("personalInfo.name")} className="dark:bg-zinc-900" />
                  </div>
                  <div className="space-y-2">
                    <Label>Professional Title</Label>
                    <Input {...register("personalInfo.title")} className="dark:bg-zinc-900" />
                  </div>
                  <div className="space-y-2">
                    <Label>Availability Status</Label>
                    <Input {...register("personalInfo.availability")} className="dark:bg-zinc-900" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Profile Image URL</Label>
                    <Input {...register("personalInfo.photo")} className="dark:bg-zinc-900 font-mono text-sm" />
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
                  <FileText className="w-5 h-5 text-indigo-500" /> About Summary
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <Textarea rows={4} className="resize-none dark:bg-zinc-900" {...register("about.summary")} />
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 3. Action Buttons */}
          <AccordionItem value="actions" className="border-none">
            <Card className="border-gray-200 dark:border-white/10 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <MousePointerClick className="w-5 h-5 text-emerald-500" /> Call to Actions
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {actionFields.map((action, index) => (
                    <div key={action.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-zinc-900/50">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-white/5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Button {index + 1}</span>
                        <div className="flex items-center gap-1 bg-white dark:bg-zinc-950 p-1 rounded-md border shadow-sm">
                          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0} onClick={() => moveAction(index, index - 1)}>
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={index === actionFields.length - 1} onClick={() => moveAction(index, index + 1)}>
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <div className="w-px h-4 bg-gray-200 mx-1" />
                          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => removeAction(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1"><Label className="text-xs">Text</Label><Input {...register(`actions.${index}.text`)} className="h-9" /></div>
                        <div className="space-y-1"><Label className="text-xs">Href</Label><Input {...register(`actions.${index}.href`)} className="h-9" /></div>
                        <div className="space-y-1"><Label className="text-xs">ID</Label><Input {...register(`actions.${index}.id`)} className="h-9" /></div>
                        <div className="space-y-1"><Label className="text-xs">Icon Class</Label><Input {...register(`actions.${index}.icon`)} className="h-9 font-mono text-xs" /></div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => appendAction({ id: "", text: "", href: "", icon: "" })} className="w-full border-dashed py-6">
                    <Plus className="w-4 h-4 mr-2" /> Add Button
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
                  <Share2 className="w-5 h-5 text-cyan-500" /> Social Media Links
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {socialLinkFields.map((link, index) => {
                    const isVisible = watch(`socialLinks.${index}.show`);
                    const tailwindClass = watch(`socialLinks.${index}.color`);

                    return (
                      <div key={link.id} className={cn("p-4 rounded-xl border transition-all", isVisible ? "bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-800" : "bg-gray-100 dark:bg-zinc-950 opacity-60 border-dashed")}>
                        

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Platform</Label>
                            <Input {...register(`socialLinks.${index}.name`)} placeholder="e.g. GitHub" className="h-9" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">URL</Label>
                            <Input {...register(`socialLinks.${index}.url`)} placeholder="https://..." className="h-9" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Tailwind Class</Label>
                            <div className="relative">
                              <Input 
                                {...register(`socialLinks.${index}.color`)} 
                                placeholder="text-sky-500" 
                                className="h-9 pl-9 font-mono text-xs" 
                                />
                              <Palette className={cn("absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4", tailwindClass || "text-gray-400")} />
                            </div>
                          </div>

                                <div className="space-y-1">
                                  <div className="inline-flex flex-row flex-wrap items-around justify-center gap-1.5 pb-1">
                          <div className="inline-flex flex-col gap-1">
                             <span className="text-xs font-bold text-muted-foreground">{isVisible ? "Visible" : "Hidden"}</span>
                             <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 px-2 py-1 rounded-lg border">
                                {isVisible ? <Eye className="w-3 h-3 text-emerald-500" /> : <EyeOff className="w-3 h-3 text-gray-400" />}
                                <Switch checked={isVisible} onCheckedChange={(val) => setValue(`socialLinks.${index}.show`, val)} />
                             </div>
                          </div>

                          <div className="inline-flex items-center gap-1 bg-white dark:bg-zinc-950 p-1 rounded-md border shadow-sm">
                            <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0} onClick={() => moveSocialLink(index, index - 1)}>
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={index === socialLinkFields.length - 1} onClick={() => moveSocialLink(index, index + 1)}>
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                            <div className="w-px h-4 bg-gray-200 mx-1" />
                            <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => removeSocialLink(index)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                                </div>
                                </div>
                      </div>
                    );
                  })}

                  <Button type="button" variant="outline" onClick={() => appendSocialLink({ name: "", url: "", icon: "", color: "text-blue-500", show: true })} className="w-full border-dashed py-6">
                    <Plus className="w-4 h-4 mr-2" /> Add Social Link
                  </Button>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

        <div className="sticky bottom-4 mt-8 flex justify-end z-50">
          <Button type="submit" disabled={isSubmitting} className={cn("shadow-2xl min-w-[160px] h-12 rounded-full text-white px-8", themes?.isGradient ? themes?.primaryGradient : "bg-blue-600 hover:bg-blue-700")}>
            {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}