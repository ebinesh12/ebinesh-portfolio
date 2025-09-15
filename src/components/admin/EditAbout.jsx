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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Define Zod schemas for validation
const educationSchema = z.object({
  degree: z.string().min(1, "Degree cannot be empty."),
  institution: z.string().min(1, "Institution cannot be empty."),
  duration: z.string().min(1, "Duration cannot be empty."),
  description: z.string().min(1, "Education description cannot be empty."),
});

const storySchema = z.object({
  title: z.string().min(1, "Story title cannot be empty."),
  paragraphs: z
    .array(z.string().min(1, "Paragraph cannot be empty."))
    .min(1, "At least one paragraph is required."),
});

const aboutSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Section description is required."),
  icon: z.string().min(1, "Icon class cannot be empty."), // <-- Added icon validation
  story: storySchema,
  education: z.array(educationSchema),
});

export default function EditAbout({ themes }) {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("/api/v1/about");
        if (response.data.success) {
          setAboutData(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch about data.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({
      ...prev,
      story: { ...prev?.story, [name]: value },
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...(aboutData?.education || [])];
    if (newEducation[index]) {
      newEducation[index] = { ...newEducation[index], [name]: value };
      setAboutData((prev) => ({ ...prev, education: newEducation }));
    }
  };

  const addEducation = () => {
    setAboutData((prev) => ({
      ...prev,
      education: [
        ...(prev?.education || []),
        { degree: "", institution: "", duration: "", description: "" },
      ],
    }));
  };

  const removeEducation = (index) => {
    const newEducation =
      aboutData?.education?.filter((_, i) => i !== index) || [];
    setAboutData((prev) => ({
      ...prev,
      education: newEducation,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = aboutSchema.safeParse(aboutData);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const promise = axios.post("/api/v1/about", validationResult.data);

    toast.promise(promise, {
      loading: "Saving changes...",
      success: "About section updated successfully!",
      error: "Failed to update about section.",
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit About Section</CardTitle>
        <CardDescription>
          Manage your story and educational background.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="superTitle">Super Title</Label>
              <Input
                name="superTitle"
                value={aboutData?.superTitle || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                value={aboutData?.title || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="description">Section Description</Label>
              <Input
                name="description"
                value={aboutData?.description || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* --- Icon Input Field --- */}
            <div>
              <Label htmlFor="icon">Icon Class</Label>
              <Input
                name="icon"
                value={aboutData?.icon || ""}
                onChange={handleInputChange}
                placeholder="e.g., fas fa-user-graduate"
              />
            </div>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["story", "education"]}
            className="w-full"
          >
            {/* My Story Section */}
            <AccordionItem value="story">
              <AccordionTrigger className="text-lg font-semibold">
                My Story & Background
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="storyTitle">Story Title</Label>
                  <Input
                    name="title"
                    value={aboutData?.story?.title || ""}
                    onChange={handleStoryChange}
                  />
                </div>
                <div>
                  <Label htmlFor="storyParagraphs">
                    Paragraphs (one per line)
                  </Label>
                  <Textarea
                    name="paragraphs"
                    value={aboutData?.story?.paragraphs?.join("\n") || ""}
                    onChange={(e) =>
                      setAboutData((prev) => ({
                        ...prev,
                        story: {
                          ...prev?.story,
                          paragraphs: e.target.value.split("\n"),
                        },
                      }))
                    }
                    rows={5}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Education Section */}
            <AccordionItem value="education">
              <AccordionTrigger className="text-lg font-semibold">
                Education
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addEducation}
                  >
                    Add Education
                  </Button>
                </div>
                {aboutData?.education?.map((edu, index) => (
                  <div
                    key={index}
                    className="space-y-4 p-4 border rounded-md relative"
                  >
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Degree</Label>
                        <Input
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, e)}
                        />
                      </div>
                      <div>
                        <Label>Institution</Label>
                        <Input
                          name="institution"
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(index, e)}
                        />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          name="duration"
                          value={edu.duration}
                          onChange={(e) => handleEducationChange(index, e)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        name="description"
                        value={edu.description}
                        onChange={(e) => handleEducationChange(index, e)}
                      />
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
