"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/services/appSchema"; // Adjust the import path
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
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
import { useTheme } from "@/utils/ThemeProvider";

export default function LoginForm() {
  const { theme } = useTheme();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

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

      if (res.status === 200) {
        // Redirect to a dashboard or home page on successful login
        router.push("/admin/contacts");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.message || "Login failed. Please try again.",
        );
      } else {
        setServerError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Card className="md:w-1/2 bg-white/40 dark:bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-gray-300 dark:border-white/20 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
          <span className={cn(
              "md:w-1/4 bg-clip-text text-transparent text-left font-semibold",
              theme?.isGradient ? theme?.primaryGradient : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
            )}>
            Login to Your Account
          </span>
        </CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-center">{serverError}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
             className={cn(
              "w-full px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
              theme?.isGradient
                ? theme?.primaryGradient
                : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
            )}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          I don't have an account?{" "}
          <Link
            href="/auth/register"
            className={cn("font-semibold bg-clip-text text-transparent hover:underline",
              theme?.isGradient ? theme?.primaryGradient : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",)}
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
