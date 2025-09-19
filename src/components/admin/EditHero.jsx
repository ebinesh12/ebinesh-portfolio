"use client";

import { useEffect } from "react";
import axios from "axios";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroSchema } from "@/services/schema";
import { heroValues } from "@/utils/constant";

export default function EditHero({ themes }) {
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
  } = useFieldArray({
    control,
    name: "actions",
  });

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

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
      }
    };
    fetchHeroData();
  }, [reset]);

  useEffect(() => {
    const allErrors = [
      ...Object.values(errors.personalInfo ?? {}),
      ...Object.values(errors.about ?? {}),
      ...(errors.actions ?? []),
      ...(errors.socialLinks ?? []),
    ];

    allErrors.forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  }, [errors]);

  const onSubmit = async (data) => {
    const promise = axios.post("/api/v1/hero", data);

    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Hero section updated successfully!",
      error: "Failed to update hero section.",
    });
  };

  return (
    <Card className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-4 rounded-2xl border border-gray-300 dark:border-white/30 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
          <span
            className={cn(
              "md:w-1/4 bg-clip-text text-transparent text-left font-semibold",
              themes?.isGradient ? themes?.primaryGradient : "",
            )}
          >
            Edit Hero Section
          </span>
        </CardTitle>
        <CardDescription>
          Update the content for your portfolio's hero section.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3
              className={cn(
                "md:w-1/4 text-lg font-semibold bg-clip-text text-transparent",
                themes?.isGradient ? themes?.primaryGradient : "",
              )}
            >
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="greeting">Greeting</Label>
                <Input id="greeting" {...register("personalInfo.greeting")} />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("personalInfo.name")} />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("personalInfo.title")} />
              </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  {...register("personalInfo.availability")}
                />
              </div>
              {/* Photo URL Input */}
              <div className="md:col-span-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  {...register("personalInfo.photo")}
                  placeholder="/images/profile.jpg"
                />
              </div>
            </div>
          </div>

          {/* About Summary */}
          <div className="space-y-2">
            <h3
              className={cn(
                "md:w-1/4 text-lg font-semibold bg-clip-text text-transparent",
                themes?.isGradient ? themes?.primaryGradient : "",
              )}
            >
              About Summary
            </h3>
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" {...register("about.summary")} />
          </div>

          {/* Actions Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3
                className={cn(
                  "text-lg font-semibold bg-clip-text text-transparent",
                  themes?.isGradient ? themes?.primaryGradient : "",
                )}
              >
                Action Buttons
              </h3>
              <Button
                type="button"
                onClick={() =>
                  appendAction({ id: "", text: "", href: "", icon: "" })
                }
                className={cn(
                  "p-3 rounded-md font-bold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                  themes?.isGradient
                    ? themes?.primaryGradient
                    : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                )}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {actionFields.map((action, index) => (
              <div
                key={action.id}
                className="flex items-end gap-4 px-4 py-6 border hover:dark:bg-white/5 dark:border-white/20 rounded-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
                  <div>
                    <Label>ID</Label>
                    <Input {...register(`actions.${index}.id`)} />
                  </div>
                  <div>
                    <Label>Text</Label>
                    <Input {...register(`actions.${index}.text`)} />
                  </div>
                  <div>
                    <Label>Link</Label>
                    <Input {...register(`actions.${index}.href`)} />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Input {...register(`actions.${index}.icon`)} />
                  </div>
                </div>
                <Button
                  type="button"
                  className={cn(
                    "text-white",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                  )}
                  size="icon"
                  onClick={() => removeAction(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3
                className={cn(
                  "text-lg font-semibold bg-clip-text text-transparent",
                  themes?.isGradient ? themes?.primaryGradient : "",
                )}
              >
                Social Links
              </h3>
              <Button
                type="button"
                onClick={() =>
                  appendSocialLink({ name: "", url: "", icon: "" })
                }
                className={cn(
                  themes?.isGradient
                    ? themes?.primaryGradient
                    : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                  "p-3 rounded-md font-bold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                )}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {socialLinkFields.map((link, index) => (
              <div
                key={link.id}
                className="flex items-end gap-4 p-4 border hover:dark:bg-white/5 dark:border-white/30 rounded-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                  <div>
                    <Label>Name</Label>
                    <Input {...register(`socialLinks.${index}.name`)} />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input {...register(`socialLinks.${index}.url`)} />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Input {...register(`socialLinks.${index}.icon`)} />
                  </div>
                </div>
                <Button
                  type="button"
                  className={cn(
                    "text-white",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                  )}
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            className={cn(
              "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
              themes?.isGradient
                ? themes?.primaryGradient
                : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
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
