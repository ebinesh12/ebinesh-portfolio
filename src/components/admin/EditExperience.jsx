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
import { Plus,Trash } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Define Zod schemas for validation
const jobSchema = z.object({
  role: z.string().min(1, "Job role cannot be empty."),
  company: z.string().min(1, "Company name cannot be empty."),
  duration: z.string().min(1, "Job duration is required."),
  responsibilities: z
    .array(z.string().min(1, "Responsibility cannot be empty."))
    .min(1, "At least one responsibility is required."),
});

const experienceSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  jobs: z.array(jobSchema),
});

export default function EditExperience({ themes }) {
  const [experienceData, setExperienceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        // Use axios for the GET request
        const response = await axios.get("/api/v1/experience");
        if (response.data.success) {
          setExperienceData(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch experience data.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperienceData();
  }, []);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setExperienceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    const newJobs = [...(experienceData?.jobs || [])];
    if (newJobs[index]) {
      newJobs[index] = { ...newJobs[index], [name]: value };
      setExperienceData((prev) => ({ ...prev, jobs: newJobs }));
    }
  };

  const handleResponsibilitiesChange = (index, value) => {
    const newJobs = [...(experienceData?.jobs || [])];
    if (newJobs[index]) {
      // Store responsibilities as an array by splitting the textarea value
      newJobs[index].responsibilities = value.split("\n");
      setExperienceData((prev) => ({ ...prev, jobs: newJobs }));
    }
  };

  const addJob = () => {
    setExperienceData((prev) => ({
      ...prev,
      jobs: [
        ...(prev?.jobs || []), // Use optional chaining for safety
        { role: "", company: "", duration: "", responsibilities: [] },
      ],
    }));
  };

  const removeJob = (index) => {
    // Use optional chaining for safer filtering
    const newJobs = experienceData?.jobs?.filter((_, i) => i !== index) || [];
    setExperienceData((prev) => ({
      ...prev,
      jobs: newJobs,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Validate data with Zod before sending to API
    const validationResult = experienceSchema.safeParse(experienceData);

    if (!validationResult.success) {
      // If validation fails, show errors for each issue
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return; // Stop the submission
    }

    // 3. Use axios for the POST request if validation succeeds
    const promise = axios.post("/api/v1/experience", validationResult.data); // Send validated data

    toast.promise(promise, {
      loading: "Saving experience...",
      success: "Experience section updated successfully!",
      error: "Failed to update experience.",
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-4 rounded-2xl border border-gray-300 dark:border-white/30 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
           <span className={cn("w-1/4 bg-clip-text text-transparent text-left font-semibold", themes?.isGradient ? themes?.primaryGradient : "")}>
              Edit Experience Section
           </span>
          </CardTitle>
        <CardDescription>
          Detail your professional journey and roles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Super Title</Label>
            <Input
              name="superTitle"
              value={experienceData?.superTitle || ""} // Add fallback
              onChange={handleMainChange}
            />
            <Label>Title</Label>
            <Input
              name="title"
              value={experienceData?.title || ""}
              onChange={handleMainChange}
            />
            <Label>Description</Label>
            <Input
              name="description"
              value={experienceData?.description || ""}
              onChange={handleMainChange}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={cn("text-lg font-semibold bg-clip-text text-transparent", themes?.isGradient ? themes?.primaryGradient : "" )}>Jobs</h3>
              <Button type="button" variant="outline" onClick={addJob} className={cn(
              "p-3 rounded-md font-bold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
              themes?.isGradient ? themes?.primaryGradient : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
            )}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {experienceData?.jobs?.map(
              (
                job,
                index, // Optional chaining on map
              ) => (
                <div
                  key={index}
                  className="space-y-4 p-4 border rounded-md relative"
                >
                  <Button
                    type="button"
                    size="icon"
                    className={cn("absolute top-2 right-2 h-7 w-7 text-white", themes?.isGradient ? themes?.primaryGradient : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500" )}
                    onClick={() => removeJob(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Role</Label>
                      <Input
                        name="role"
                        value={job.role}
                        onChange={(e) => handleJobChange(index, e)}
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        name="company"
                        value={job.company}
                        onChange={(e) => handleJobChange(index, e)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Duration</Label>
                      <Input
                        name="duration"
                        value={job.duration}
                        onChange={(e) => handleJobChange(index, e)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Responsibilities (one per line)</Label>
                    <Textarea
                      name="responsibilities"
                      value={job.responsibilities?.join("\n") || ""}
                      onChange={(e) =>
                        handleResponsibilitiesChange(index, e.target.value)
                      }
                      rows={4}
                    />
                  </div>
                </div>
              ),
            )}
          </div>

          <Button
            className={cn(
              "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
              themes?.isGradient ? themes?.primaryGradient  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
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
