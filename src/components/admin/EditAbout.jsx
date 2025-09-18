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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { aboutSchema } from "@/services/schema";
import { aboutValues } from "@/utils/constant";

export default function EditAbout({ themes }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues: aboutValues,
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("/api/v1/about");
        if (response.data.success) {
          reset(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch about data.");
        console.error("Fetch error:", error);
      }
    };
    fetchAboutData();
  }, [reset]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/about", data);

    toast.promise(promise, {
      loading: "Saving changes...",
      success: "About section updated successfully!",
      error: (err) => err.response?.data?.message || "Failed to update about section.",
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
            Edit About Section
          </span>
        </CardTitle>
        <CardDescription>
          Manage your story and educational background.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="superTitle">Super Title</Label>
              <Input
                id="superTitle"
                {...register("superTitle")}
              />
              {errors.superTitle && <p className="text-red-500 text-sm mt-1">{errors.superTitle.message}</p>}
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Section Description</Label>
              <Input id="description" {...register("description")} />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                {...register("icon")}
                placeholder="fas fa-user-graduate"
              />
              {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>}
            </div>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["story", "education"]}
            className="w-full"
          >
            {/* My Story Section */}
            <AccordionItem value="story">
              <AccordionTrigger>
                <span
                  className={cn(
                    "md:w-1/4 bg-clip-text text-transparent text-lg text-left font-semibold",
                    themes?.isGradient ? themes?.primaryGradient : ""
                  )}
                >
                  My Story & Background
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="storyTitle">Story Title</Label>
                  <Input
                    id="storyTitle"
                    {...register("story.title")}
                  />
                  {errors.story?.title && <p className="text-red-500 text-sm mt-1">{errors.story.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="storyParagraphs">
                    Paragraphs (one per line)
                  </Label>
                  <Controller
                    name="story.paragraphs"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="storyParagraphs"
                        value={Array.isArray(field.value) ? field.value.join("\n") : ""}
                        onChange={(e) => field.onChange(e.target.value.split("\n"))}
                        rows={5}
                      />
                    )}
                  />
                  {errors.story?.paragraphs && <p className="text-red-500 text-sm mt-1">{errors.story.paragraphs.message}</p>}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Education Section */}
            <AccordionItem value="education">
              <AccordionTrigger className="mt-5">
                <span
                  className={cn(
                    "md:w-1/4 bg-clip-text text-transparent text-lg text-left font-semibold",
                    themes?.isGradient ? themes?.primaryGradient : ""
                  )}
                >
                  Education
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => appendEducation({ degree: "", institution: "", duration: "", description: "" })}
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
                {educationFields.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="space-y-4 p-4 border hover:dark:bg-white/5 dark:border-white/20 rounded-md relative"
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
                      onClick={() => removeEducation(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Degree</Label>
                        <Input {...register(`education.${index}.degree`)} />
                      </div>
                      <div>
                        <Label>Institution</Label>
                        <Input {...register(`education.${index}.institution`)} />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input {...register(`education.${index}.duration`)} />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea {...register(`education.${index}.description`)} />
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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