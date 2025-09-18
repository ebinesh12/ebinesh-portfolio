"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { z } from "zod"; // Import zod
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

// 1. Define the Zod schemas for validation
const actionSchema = z.object({
  id: z.string().min(1, "Action ID cannot be empty."),
  text: z.string().min(1, "Button text cannot be empty."),
  href: z.string().min(1, "URL/href cannot be empty."),
  icon: z.string().min(1, "Icon class cannot be empty."),
});

const socialLinkSchema = z.object({
  name: z.string().min(1, "Social link name cannot be empty."),
  url: z.string().url("Invalid URL format."),
  icon: z.string().min(1, "Icon class cannot be empty."),
});

const heroSchema = z.object({
  personalInfo: z.object({
    greeting: z.string().min(1, "Greeting is required."),
    name: z.string().min(1, "Name is required."),
    title: z.string().min(1, "Title is required."),
    availability: z.string().min(1, "Availability is required."),
    photo: z.string().optional(), // <-- Added photo validation
  }),
  about: z.object({
    summary: z.string().min(10, "Summary must be at least 10 characters long."),
  }),
  actions: z.array(actionSchema),
  socialLinks: z.array(socialLinkSchema),
});

export default function EditHero({ themes }) {
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get("/api/v1/hero");
        if (response.data.success) {
          setHeroData(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch hero data.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({
      ...prev,
      personalInfo: { ...prev?.personalInfo, [name]: value },
    }));
  };

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({
      ...prev,
      about: { ...prev?.about, [name]: value },
    }));
  };

  const handleActionChange = (index, e) => {
    const { name, value } = e.target;
    const newActions = [...(heroData?.actions || [])];
    if (newActions[index]) {
      newActions[index] = { ...newActions[index], [name]: value };
      setHeroData((prev) => ({ ...prev, actions: newActions }));
    }
  };

  const addAction = () => {
    setHeroData((prev) => ({
      ...prev,
      actions: [
        ...(prev?.actions || []),
        { id: "", text: "", href: "", icon: "" },
      ],
    }));
  };

  const removeAction = (index) => {
    const newActions = heroData?.actions?.filter((_, i) => i !== index) || [];
    setHeroData((prev) => ({ ...prev, actions: newActions }));
  };

  const handleSocialLinkChange = (index, e) => {
    const { name, value } = e.target;
    const newLinks = [...(heroData?.socialLinks || [])];
    if (newLinks[index]) {
      newLinks[index] = { ...newLinks[index], [name]: value };
      setHeroData((prev) => ({ ...prev, socialLinks: newLinks }));
    }
  };

  const addSocialLink = () => {
    setHeroData((prev) => ({
      ...prev,
      socialLinks: [
        ...(prev?.socialLinks || []),
        { name: "", url: "", icon: "" },
      ],
    }));
  };

  const removeSocialLink = (index) => {
    const newLinks = heroData?.socialLinks?.filter((_, i) => i !== index) || [];
    setHeroData((prev) => ({ ...prev, socialLinks: newLinks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = heroSchema.safeParse(heroData);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const promise = axios.post("/api/v1/hero", validationResult.data);

    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Hero section updated successfully!",
      error: "Failed to update hero section.",
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
        <form onSubmit={handleSubmit} className="space-y-8">
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
                <Input
                  id="greeting"
                  name="greeting"
                  value={heroData?.personalInfo?.greeting || ""}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={heroData?.personalInfo?.name || ""}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={heroData?.personalInfo?.title || ""}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  name="availability"
                  value={heroData?.personalInfo?.availability || ""}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              {/* Photo URL Input */}
              <div className="md:col-span-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  name="photo"
                  value={heroData?.personalInfo?.photo || ""}
                  onChange={handlePersonalInfoChange}
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
            <Textarea
              id="summary"
              name="summary"
              className={""}
              value={heroData?.about?.summary || ""}
              onChange={handleAboutChange}
            />
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
                onClick={addAction}
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
            {heroData?.actions?.map((action, index) => (
              <div
                key={index}
                className="flex items-end gap-4 px-4 py-6 border hover:dark:bg-white/5 dark:border-white/20 rounded-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
                  <div>
                    <Label>ID</Label>
                    <Input
                      name="id"
                      value={action.id}
                      onChange={(e) => handleActionChange(index, e)}
                    />
                  </div>
                  <div>
                    <Label>Text</Label>
                    <Input
                      name="text"
                      value={action.text}
                      onChange={(e) => handleActionChange(index, e)}
                    />
                  </div>
                  <div>
                    <Label>Link</Label>
                    <Input
                      name="href"
                      value={action.href}
                      onChange={(e) => handleActionChange(index, e)}
                    />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Input
                      name="icon"
                      value={action.icon}
                      onChange={(e) => handleActionChange(index, e)}
                    />
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
                onClick={addSocialLink}
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
            {heroData?.socialLinks?.map((link, index) => (
              <div
                key={index}
                className="flex items-end gap-4 p-4 border hover:dark:bg-white/5 dark:border-white/30 rounded-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                  <div>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      value={link.name}
                      onChange={(e) => handleSocialLinkChange(index, e)}
                    />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input
                      name="url"
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, e)}
                    />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Input
                      name="icon"
                      value={link.icon}
                      onChange={(e) => handleSocialLinkChange(index, e)}
                    />
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
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
