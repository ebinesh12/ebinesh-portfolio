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

// 1. Define Zod schemas for validation
const achievementItemSchema = z.object({
  icon: z.string().min(1, "Achievement icon is required."),
  title: z.string().min(1, "Achievement title cannot be empty."),
  description: z.string().min(1, "Achievement description cannot be empty."),
});

const achievementsSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  items: z.array(achievementItemSchema),
});

export default function EditAchievements({ themes }) {
  const [achievementsData, setAchievementsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievementsData = async () => {
      try {
        // Use axios for the GET request
        const response = await axios.get("/api/v1/achievement");
        if (response.data.success) {
          setAchievementsData(response.data.data);
        } else {
          // Initialize with a default structure if API returns success: false but no data
          setAchievementsData({
            superTitle: "My",
            title: "Achievements",
            description: "",
            items: [],
          });
        }
      } catch (error) {
        toast.error("Failed to fetch achievements data.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievementsData();
  }, []);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setAchievementsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...(achievementsData?.items || [])];
    if (newItems[index]) {
      newItems[index] = { ...newItems[index], [name]: value };
      setAchievementsData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const addItem = () => {
    setAchievementsData((prev) => ({
      ...prev,
      items: [
        ...(prev?.items || []), // Use optional chaining for safety
        { icon: "", title: "", description: "" },
      ],
    }));
  };

  const removeItem = (index) => {
    // Use optional chaining for safer filtering
    const newItems =
      achievementsData?.items?.filter((_, i) => i !== index) || [];
    setAchievementsData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Validate data with Zod before sending to API
    const validationResult = achievementsSchema.safeParse(achievementsData);

    if (!validationResult.success) {
      // If validation fails, show errors for each issue
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return; // Stop the submission
    }

    // 3. Use axios for the POST request if validation succeeds
    const promise = axios.post("/api/v1/achievement", validationResult.data); // Send validated data

    toast.promise(promise, {
      loading: "Saving achievements...",
      success: "Achievements section updated successfully!",
      error: "Failed to update achievements.",
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
            Edit Achievements Section
          </span>
        </CardTitle>
        <CardDescription>
          Highlight your key accomplishments and awards.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Super Title</Label>
            <Input
              name="superTitle"
              value={achievementsData?.superTitle || ""} // Add fallback
              onChange={handleMainChange}
            />
            <Label>Title</Label>
            <Input
              name="title"
              value={achievementsData?.title || ""}
              onChange={handleMainChange}
            />
            <Label>Description</Label>
            <Input
              name="description"
              value={achievementsData?.description || ""}
              onChange={handleMainChange}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3
                className={cn(
                  "w-1/4 text-lg font-semibold bg-clip-text text-transparent",
                  themes?.isGradient ? themes?.primaryGradient : "",
                )}
              >
                Achievements
              </h3>
              <Button
                type="button"
                onClick={addItem}
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

            {achievementsData?.items?.map(
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
                    className={cn(
                      "absolute top-2 right-2 h-7 w-7 text-white",
                      themes?.isGradient
                        ? themes?.primaryGradient
                        : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                    )}
                    size="icon"
                    onClick={() => removeItem(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Icon</Label>
                      <Input
                        name="icon"
                        placeholder="e.g., fa-solid fa-trophy"
                        value={item.icon}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Title</Label>
                      <Input
                        name="title"
                        placeholder="e.g., Programming Contest Winner"
                        value={item.title}
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
                  </div>
                </div>
              ),
            )}
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
