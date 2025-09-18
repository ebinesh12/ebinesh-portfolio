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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { skillsSchema } from "@/services/schema";
import { skillsValues } from "@/utils/constant";

function SkillsArray({ control, catIndex, themes }) {
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: `categories.${catIndex}.items`,
  });

  return (
    <div className="border-t pt-4 mt-4 space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Skills</h4>
        <Button
          type="button"
          size="sm"
          onClick={() =>
            appendSkill({ name: "", level: "", icon: "", color: "" })
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
      {skillFields.map((item, itemIndex) => (
        <div
          key={item.id}
          className="flex items-end gap-2 p-2 border rounded-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 flex-grow">
            <div>
              <Label>Name</Label>
              <Input
                {...control.register(
                  `categories.${catIndex}.items.${itemIndex}.name`
                )}
              />
            </div>
            <div>
              <Label>Level</Label>
              <Input
                {...control.register(
                  `categories.${catIndex}.items.${itemIndex}.level`
                )}
              />
            </div>
            <div>
              <Label>Icon</Label>
              <Input
                {...control.register(
                  `categories.${catIndex}.items.${itemIndex}.icon`
                )}
              />
            </div>
            <div>
              <Label>Color (Tailwind)</Label>
              <Input
                {...control.register(
                  `categories.${catIndex}.items.${itemIndex}.color`
                )}
                placeholder="text-blue-500"
              />
            </div>
          </div>
          <Button
            type="button"
            className={cn(
              "text-white",
              themes?.isGradient
                ? themes?.primaryGradient
                : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
            )}
            size="icon"
            onClick={() => removeSkill(itemIndex)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function EditSkills({ themes }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: skillsValues,
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "categories",
  });

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await axios.get("/api/v1/skill");
        if (response.data.success) {
          reset(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch skills data.");
        console.error("Fetch error:", error);
      }
    };
    fetchSkillsData();
  }, [reset]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/skill", data);
    toast.promise(promise, {
      loading: "Saving skills...",
      success: "Skills section updated successfully!",
      error: "Failed to update skills.",
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-4 rounded-2xl border border-gray-300 dark:border-white/30 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
          <span
            className={cn(
              "w-1/4 bg-clip-text text-transparent text-left font-semibold",
              themes?.isGradient ? themes?.primaryGradient : ""
            )}
          >
            Edit Skills Section
          </span>
        </CardTitle>
        <CardDescription>
          Manage your technical skills and their categories.
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
                  "bg-clip-text text-transparent text-lg text-left font-semibold",
                  themes?.isGradient ? themes?.primaryGradient : ""
                )}
              >
                Skill Categories
              </h3>
              <Button
                type="button"
                onClick={() => appendCategory({ title: "", icon: "", items: [{ name: "New Skill", level: "Intermediate", icon: "fab fa-react", color: "text-blue-500" }] })}
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
            <Accordion type="multiple" className="w-full">
              {categoryFields.map((cat, catIndex) => (
                <AccordionItem value={`category-${cat.id}`} key={cat.id}>
                  <div className="flex w-full items-center justify-between">
                    <AccordionTrigger className="flex-1 text-left">
                      <span>{cat.title || "New Category"}</span>
                    </AccordionTrigger>
                    <Button
                      type="button"
                      className={cn(
                        "text-white",
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
                      )}
                      size="icon"
                      onClick={() => removeCategory(catIndex)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <AccordionContent className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Category Title</Label>
                        <Input {...register(`categories.${catIndex}.title`)} />
                      </div>
                      <div>
                        <Label>Category Icon</Label>
                        <Input {...register(`categories.${catIndex}.icon`)} />
                      </div>
                    </div>
                    <SkillsArray
                      control={control}
                      catIndex={catIndex}
                      themes={themes}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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