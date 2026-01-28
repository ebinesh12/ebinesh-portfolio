"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/services/schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Icons
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UploadCloud,
  Loader2,
  ArrowRight,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState(""); // To display selected file name

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch, // To watch for file changes
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }

    try {
      const res = await axios.post("/api/v1/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        // Optional: Redirect to login with a query param to show success message
        router.push("/auth/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.message ||
            "Registration failed. Please try again.",
        );
      } else {
        setServerError("Network error. Please try again later.");
      }
    }
  };

  // Helper to handle file input visual change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <Card className="w-full max-w-lg border-neutral-200 bg-white/80 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Create Account
        </CardTitle>
        <CardDescription className="text-neutral-500 dark:text-neutral-400">
          Join the admin panel to manage your portfolio.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="sr-only">
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              <Input
                id="username"
                type="text"
                placeholder="Username"
                className={cn(
                  "pl-10 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
                  errors.username &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
                {...register("username")}
              />
            </div>
            {errors.username && (
              <p className="text-xs font-medium text-red-500 mt-1 ml-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                className={cn(
                  "pl-10 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
                  errors.email && "border-red-500 focus-visible:ring-red-500",
                )}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-red-500 mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={cn(
                  "pl-10 pr-10 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
                  errors.password &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-red-500 mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Custom File Upload Area */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Profile Image (Optional)
            </Label>
            <div className="relative group">
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden" // Hide default input
                {...register("profileImage", {
                  onChange: handleFileChange,
                })}
              />
              <Label
                htmlFor="profileImage"
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 py-6 text-center transition-all hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900/50 dark:hover:bg-neutral-900",
                  errors.profileImage &&
                    "border-red-500 bg-red-50 dark:bg-red-900/10",
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  {fileName ? (
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <ImageIcon className="h-6 w-6" />
                      <span className="text-sm font-semibold">{fileName}</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-neutral-400 group-hover:scale-110 transition-transform" />
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </div>
                    </>
                  )}
                </div>
              </Label>
            </div>
            {errors.profileImage && (
              <p className="text-xs font-medium text-red-500 mt-1 ml-1">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {serverError && (
            <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50">
              <AlertCircle className="h-4 w-4" />
              {serverError}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-all"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-neutral-100 bg-neutral-50/50 py-4 dark:border-neutral-800 dark:bg-neutral-900/50 rounded-b-xl">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-neutral-900 hover:underline dark:text-white"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
