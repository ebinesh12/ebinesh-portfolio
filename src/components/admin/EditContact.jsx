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
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Define Zod schemas for validation
const connectMethodSchema = z.object({
  type: z.string().min(1, "Method type cannot be empty."),
  value: z.string().min(1, "Method value cannot be empty."),
  href: z.string().url("Invalid URL/href format."),
  icon: z.string().min(1, "Method icon is required."),
});

const contactSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  connect: z.object({
    title: z.string().min(1, "Connect section title is required."),
    methods: z.array(connectMethodSchema),
  }),
});

export default function EditContact({ themes }) {
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        // Use axios for the GET request
        const response = await axios.get("/api/v1/link");
        if (response.data.success) {
          setContactData(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch contact data.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching contact data.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactData();
  }, []);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConnectTitleChange = (e) => {
    const { value } = e.target;
    setContactData((prev) => ({
      ...prev,
      connect: { ...prev?.connect, title: value },
    }));
  };

  const handleMethodChange = (index, e) => {
    const { name, value } = e.target;
    const newMethods = [...(contactData?.connect?.methods || [])];
    if (newMethods[index]) {
      newMethods[index] = { ...newMethods[index], [name]: value };
      setContactData((prev) => ({
        ...prev,
        connect: { ...prev?.connect, methods: newMethods },
      }));
    }
  };

  const addMethod = () => {
    setContactData((prev) => ({
      ...prev,
      connect: {
        ...prev?.connect,
        methods: [
          ...(prev?.connect?.methods || []),
          { type: "", value: "", href: "", icon: "" },
        ],
      },
    }));
  };

  const removeMethod = (index) => {
    const newMethods =
      contactData?.connect?.methods?.filter((_, i) => i !== index) || [];
    setContactData((prev) => ({
      ...prev,
      connect: { ...prev?.connect, methods: newMethods },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Validate data with Zod before sending to API
    const validationResult = contactSchema.safeParse(contactData);

    if (!validationResult.success) {
      // If validation fails, show errors for each issue
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return; // Stop the submission
    }

    // 3. Use axios for the POST request if validation succeeds
    const promise = axios.post("/api/v1/link", validationResult.data); // Send validated data

    toast.promise(promise, {
      loading: "Saving contact info...",
      success: "Contact section updated!",
      error: "Failed to update contact section.",
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-gray-300 dark:border-white/20 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
           <span className={cn("w-1/4 bg-clip-text text-transparent text-left font-semibold", themes?.isGradient ? themes?.primaryGradient : "")}>
               Edit Contact Section
           </span>
          </CardTitle>
        <CardDescription>
          Manage your contact information and links.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Super Title</Label>
            <Input
              name="superTitle"
              value={contactData?.superTitle || ""} // Add fallback
              onChange={handleMainChange}
            />
            <Label>Title</Label>
            <Input
              name="title"
              value={contactData?.title || ""}
              onChange={handleMainChange}
            />
            <Label>Description</Label>
            <Input
              name="description"
              value={contactData?.description || ""}
              onChange={handleMainChange}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={cn("text-lg font-semibold bg-clip-text text-transparent", themes?.isGradient ? themes?.primaryGradient : "" )}>Connect Methods</h3>
              <Button type="button" variant="secondary" onClick={addMethod} className={cn(
              "p-3 rounded-md font-bold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
              themes?.isGradient ? themes?.primaryGradient : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
            )}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label>Connect Section Title</Label>
              <Input
                value={contactData?.connect?.title || ""} // Optional chaining
                onChange={handleConnectTitleChange}
              />
            </div>
            {contactData?.connect?.methods?.map(
              (
                method,
                index, // Optional chaining
              ) => (
                <div
                  key={index}
                  className="flex items-end gap-2 p-4 border rounded-md"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
                    <div>
                      <Label>Type</Label>
                      <Input
                        name="type"
                        placeholder="e.g., Email"
                        value={method.type}
                        onChange={(e) => handleMethodChange(index, e)}
                      />
                    </div>
                    <div>
                      <Label>Value</Label>
                      <Input
                        name="value"
                        placeholder="e.g., Connect with me"
                        value={method.value}
                        onChange={(e) => handleMethodChange(index, e)}
                      />
                    </div>
                    <div>
                      <Label>Href</Label>
                      <Input
                        name="href"
                        placeholder="e.g., mailto:..."
                        value={method.href}
                        onChange={(e) => handleMethodChange(index, e)}
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Input
                        name="icon"
                        placeholder="e.g., fas fa-envelope"
                        value={method.icon}
                        onChange={(e) => handleMethodChange(index, e)}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    className={cn( "text-white", themes?.isGradient ? themes?.primaryGradient : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500" )}
                    size="icon"
                    onClick={() => removeMethod(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
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
