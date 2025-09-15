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
const certificateItemSchema = z.object({
  title: z.string().min(1, "Certificate title cannot be empty."),
  issuer: z.string().min(1, "Issuer cannot be empty."),
  description: z.string().min(1, "Description cannot be empty."),
  date: z.string().min(1, "Date is required."),
  pdf: z.string().url("Invalid PDF URL format."),
});

const certificatesSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  items: z.array(certificateItemSchema),
});

export default function EditCertificates({ themes }) {
  const [certificatesData, setCertificatesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificatesData = async () => {
      try {
        // Use axios for the GET request
        const response = await axios.get("/api/v1/certificate");
        if (response.data.success) {
          setCertificatesData(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch certificates data.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCertificatesData();
  }, []);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setCertificatesData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...(certificatesData?.items || [])];
    if (newItems[index]) {
      newItems[index] = { ...newItems[index], [name]: value };
      setCertificatesData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const addItem = () => {
    setCertificatesData((prev) => ({
      ...prev,
      items: [
        ...(prev?.items || []), // Use optional chaining for safety
        { title: "", issuer: "", description: "", date: "", pdf: "" },
      ],
    }));
  };

  const removeItem = (index) => {
    // Use optional chaining for safer filtering
    const newItems =
      certificatesData?.items?.filter((_, i) => i !== index) || [];
    setCertificatesData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Validate data with Zod before sending to API
    const validationResult = certificatesSchema.safeParse(certificatesData);

    if (!validationResult.success) {
      // If validation fails, show errors for each issue
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return; // Stop the submission
    }

    // 3. Use axios for the POST request if validation succeeds
    const promise = axios.post("/api/v1/certificate", validationResult.data); // Send validated data

    toast.promise(promise, {
      loading: "Saving certificates...",
      success: "Certificates section updated!",
      error: "Failed to update certificates.",
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Certificates Section</CardTitle>
        <CardDescription>
          Showcase your professional certifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Super Title</Label>
            <Input
              name="superTitle"
              value={certificatesData?.superTitle || ""} // Add fallback
              onChange={handleMainChange}
            />
            <Label>Title</Label>
            <Input
              name="title"
              value={certificatesData?.title || ""}
              onChange={handleMainChange}
            />
            <Label>Description</Label>
            <Input
              name="description"
              value={certificatesData?.description || ""}
              onChange={handleMainChange}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Certificates</h3>
              <Button type="button" variant="outline" onClick={addItem}>
                Add Certificate
              </Button>
            </div>
            {certificatesData?.items?.map(
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
                      <Label>Issuer</Label>
                      <Input
                        name="issuer"
                        value={item.issuer}
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
                      <Label>Date</Label>
                      <Input
                        name="date"
                        value={item.date}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="e.g., June 2024"
                      />
                    </div>
                    <div>
                      <Label>PDF Link</Label>
                      <Input
                        name="pdf"
                        value={item.pdf}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="https://example.com/certificate.pdf"
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
