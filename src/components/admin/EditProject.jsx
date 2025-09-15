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
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Define Zod schemas for validation
const projectItemSchema = z.object({
  title: z.string().min(1, "Project title cannot be empty."),
  description: z.string().min(1, "Project description cannot be empty."),
  icon: z.string().min(1, "Project icon is required."),
  github: z.string().url("Invalid GitHub URL format."),
  demo: z.string().url("Invalid Demo URL format."),
  gradient: z.string().min(1, "Gradient is required."),
});

const projectsSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  items: z.array(projectItemSchema),
});

export default function EditProjects({ themes }) {
  const [projectsData, setProjectsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        // Use axios for the GET request
        const response = await axios.get("/api/v1/project");
        if (response.data.success) {
          setProjectsData(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch projects data.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectsData();
  }, []);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setProjectsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    // Use optional chaining for safe access
    const newItems = [...(projectsData?.items || [])];
    if (newItems[index]) {
      newItems[index] = { ...newItems[index], [name]: value };
      setProjectsData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const addItem = () => {
    setProjectsData((prev) => ({
      ...prev,
      items: [
        ...(prev?.items || []), // Use optional chaining
        {
          title: "",
          description: "",
          gradient: "",
          icon: "",
          github: "",
          demo: "",
        },
      ],
    }));
  };

  const removeItem = (index) => {
    // Use optional chaining for safer filtering
    const newItems = projectsData?.items?.filter((_, i) => i !== index) || [];
    setProjectsData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Validate data with Zod before sending to API
    const validationResult = projectsSchema.safeParse(projectsData);

    if (!validationResult.success) {
      // If validation fails, show errors for each issue
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return; // Stop the submission
    }

    // 3. Use axios for the POST request if validation succeeds
    const promise = axios.post("/api/v1/project", validationResult.data); // Send validated data

    toast.promise(promise, {
      loading: "Saving projects...",
      success: "Projects section updated!",
      error: "Failed to update projects.",
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Projects Section</CardTitle>
        <CardDescription>
          Manage the projects you want to showcase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Super Title</Label>
            <Input
              name="superTitle"
              value={projectsData?.superTitle || ""} // Add fallback
              onChange={handleMainChange}
            />
            <Label>Title</Label>
            <Input
              name="title"
              value={projectsData?.title || ""}
              onChange={handleMainChange}
            />
            <Label>Description</Label>
            <Input
              name="description"
              value={projectsData?.description || ""}
              onChange={handleMainChange}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Projects</h3>
              <Button type="button" variant="outline" onClick={addItem}>
                Add Project
              </Button>
            </div>
            {projectsData?.items?.map(
              (
                item,
                index, // Optional chaining on map
              ) => (
                <div
                  key={index}
                  className="space-y-4 p-4 border rounded-md relative"
                >
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        name="title"
                        value={item.title}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Input
                        name="icon"
                        value={item.icon}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        name="description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div>
                      <Label>GitHub URL</Label>
                      <Input
                        name="github"
                        value={item.github}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <Label>Demo URL</Label>
                      <Input
                        name="demo"
                        value={item.demo}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="https://example.com/..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Gradient (Tailwind CSS)</Label>
                      <Input
                        name="gradient"
                        value={item.gradient}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="from-blue-500 to-teal-400"
                      />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
