"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/services/schema";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useUserStore } from "@/stores/userStore";

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
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function LoginForm() {
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const router = useRouter();
  // const { loginUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");

    try {
      const res = await axios.post("/api/v1/login", data);

      if (res.status === 200 && res.data.user) {
        // loginUser(res.data.user);
        // Using window.location to ensure a full state reset for the admin panel
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = "/admin";
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.message ||
            "Invalid credentials. Please try again.",
        );
      } else {
        setServerError("Connection failed. Please check your network.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md border-neutral-200 bg-white/80 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Welcome back
        </CardTitle>
        <CardDescription className="text-neutral-500 dark:text-neutral-400">
          Enter your email to access the admin dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={cn(
                  "pl-10 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
                  errors.email && "border-red-500 focus-visible:ring-red-500",
                )}
                {...register("email")}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={cn(
                  "pl-10 pr-10 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
                  errors.password &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
                {...register("password")}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-2 border border-red-200 dark:border-red-900/50">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="group w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-neutral-100 bg-neutral-50/50 py-4 dark:border-neutral-800 dark:bg-neutral-900/50 rounded-b-xl">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Don&apos;t have access?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-neutral-900 hover:underline dark:text-white"
          >
            Request Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
