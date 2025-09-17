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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Define Zod schemas for validation
const skillItemSchema = z.object({
  name: z.string().min(1, "Skill name is required."),
  level: z.string().min(1, "Skill level is required."),
  icon: z.string().min(1, "Skill icon is required."),
  color: z.string().optional(),
});

const skillCategorySchema = z.object({
  title: z.string().min(1, "Category title cannot be empty."),
  icon: z.string().min(1, "Category icon cannot be empty."),
  items: z
    .array(skillItemSchema)
    .min(1, "Each category must have at least one skill."),
});

const skillsSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  categories: z.array(skillCategorySchema),
});

export default function EditSkills({ themes }) {
  const [skillsData, setSkillsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await axios.get("/api/v1/skill");
        if (response.data.success) {
          setSkillsData(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch skills data.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkillsData();
  }, []);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setSkillsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (catIndex, e) => {
    const { name, value } = e.target;
    const newCategories = [...(skillsData?.categories || [])];
    if (newCategories[catIndex]) {
      newCategories[catIndex] = { ...newCategories[catIndex], [name]: value };
      setSkillsData((prev) => ({ ...prev, categories: newCategories }));
    }
  };

  const addCategory = () => {
    setSkillsData((prev) => ({
      ...prev,
      categories: [
        ...(prev?.categories || []),
        { title: "", icon: "", items: [] },
      ],
    }));
  };

  const removeCategory = (catIndex) => {
    const newCategories =
      skillsData?.categories?.filter((_, i) => i !== catIndex) || [];
    setSkillsData((prev) => ({ ...prev, categories: newCategories }));
  };

  const handleSkillChange = (catIndex, itemIndex, e) => {
    const { name, value } = e.target;
    const newCategories = [...(skillsData?.categories || [])];
    if (newCategories[catIndex]?.items[itemIndex]) {
      newCategories[catIndex].items[itemIndex] = {
        ...newCategories[catIndex].items[itemIndex],
        [name]: value,
      };
      setSkillsData((prev) => ({ ...prev, categories: newCategories }));
    }
  };

  const addSkill = (catIndex) => {
    const newCategories = [...(skillsData?.categories || [])];
    if (newCategories[catIndex]) {
      newCategories[catIndex].items.push({
        name: "",
        level: "",
        icon: "",
        color: "",
      });
      setSkillsData((prev) => ({ ...prev, categories: newCategories }));
    }
  };

  const removeSkill = (catIndex, itemIndex) => {
    const newCategories = [...(skillsData?.categories || [])];
    if (newCategories[catIndex]) {
      newCategories[catIndex].items = newCategories[catIndex].items.filter(
        (_, i) => i !== itemIndex,
      );
      setSkillsData((prev) => ({ ...prev, categories: newCategories }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = skillsSchema.safeParse(skillsData);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const promise = axios.post("/api/v1/skill", validationResult.data);

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
              themes?.isGradient ? themes?.primaryGradient : "",
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Super Title</Label>
            <Input
              name="superTitle"
              value={skillsData?.superTitle || ""}
              onChange={handleMainChange}
            />
            <Label>Title</Label>
            <Input
              name="title"
              value={skillsData?.title || ""}
              onChange={handleMainChange}
            />
            <Label>Description</Label>
            <Input
              name="description"
              value={skillsData?.description || ""}
              onChange={handleMainChange}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3
                className={cn(
                  "bg-clip-text text-transparent text-lg text-left font-semibold",
                  themes?.isGradient ? themes?.primaryGradient : "",
                )}
              >
                Skill Categories
              </h3>
              <Button
                type="button"
                onClick={addCategory}
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
            <Accordion type="multiple" className="w-full">
              {skillsData?.categories?.map((cat, catIndex) => (
                <AccordionItem value={`category-${catIndex}`} key={catIndex}>
                  {/* --- FIX START --- */}
                  {/* Wrap Trigger and Button in a flex container to make them siblings */}
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
                          : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                      )}
                      size="icon"
                      // className="mr-2 flex-shrink-0" // Add spacing and prevent shrinking
                      onClick={() => removeCategory(catIndex)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* --- FIX END --- */}

                  <AccordionContent className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Category Title</Label>
                        <Input
                          name="title"
                          value={cat.title}
                          onChange={(e) => handleCategoryChange(catIndex, e)}
                        />
                      </div>
                      <div>
                        <Label>Category Icon</Label>
                        <Input
                          name="icon"
                          value={cat.icon}
                          onChange={(e) => handleCategoryChange(catIndex, e)}
                        />
                      </div>
                    </div>
                    <div className="border-t pt-4 mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Skills</h4>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addSkill(catIndex)}
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
                      {cat.items?.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-end gap-2 p-2 border rounded-md"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 flex-grow">
                            <div>
                              <Label>Name</Label>
                              <Input
                                name="name"
                                value={item.name}
                                onChange={(e) =>
                                  handleSkillChange(catIndex, itemIndex, e)
                                }
                              />
                            </div>
                            <div>
                              <Label>Level</Label>
                              <Input
                                name="level"
                                value={item.level}
                                onChange={(e) =>
                                  handleSkillChange(catIndex, itemIndex, e)
                                }
                              />
                            </div>
                            <div>
                              <Label>Icon</Label>
                              <Input
                                name="icon"
                                value={item.icon}
                                onChange={(e) =>
                                  handleSkillChange(catIndex, itemIndex, e)
                                }
                              />
                            </div>
                            <div>
                              <Label>Color (Tailwind)</Label>
                              <Input
                                name="color"
                                value={item.color || ""}
                                placeholder="text-blue-500"
                                onChange={(e) =>
                                  handleSkillChange(catIndex, itemIndex, e)
                                }
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
                            onClick={() => removeSkill(catIndex, itemIndex)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
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
