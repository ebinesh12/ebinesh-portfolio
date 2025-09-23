"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";
import { useTheme } from "@/utils/ThemeProvider";

// Import your validation schemas
import {
  profileInfoSchema,
  passwordChangeSchema,
  profileImageSchema,
  resumeSchema,
} from "@/services/schema";

// Import your UI components
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
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { theme } = useTheme();

  const router = useRouter();
  const { user, loginUser } = useUserStore();
  const imageUrl = `/api/v1/admin/${user?.id}/img`;
  const [previewImage, setPreviewImage] = useState(imageUrl);

  const [isInfoEditable, setIsInfoEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [isImageEditable, setIsImageEditable] = useState(false);
  const [isResumeEditable, setIsResumeEditable] = useState(false);

  // --- Refetch user data and update the global store ---
  const refetchUserData = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/detail");
      loginUser(data.user);
    } catch (error) {
      toast.error("Could not refresh user data.");
      console.error("Refetch error:", error);
    }
  };

  // --- Form Hooks (no changes here) ---
  const {
    register: registerInfo,
    handleSubmit: handleInfoSubmit,
    formState: { errors: infoErrors, isSubmitting: isInfoSubmitting },
    reset: resetInfoForm,
  } = useForm({ resolver: zodResolver(profileInfoSchema) });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPasswordForm,
  } = useForm({ resolver: zodResolver(passwordChangeSchema) });

  const {
    register: registerImage,
    handleSubmit: handleImageSubmit,
    watch,
    formState: { errors: imageErrors, isSubmitting: isImageSubmitting },
    reset: resetImageForm,
  } = useForm({ resolver: zodResolver(profileImageSchema) });

  const {
    register: registerResume,
    handleSubmit: handleResumeSubmit,
    formState: { errors: resumeErrors, isSubmitting: isResumeSubmitting },
    reset: resetResumeForm,
    watch: watchResume,
  } = useForm({ resolver: zodResolver(resumeSchema) });

  // --- Effects ---
  useEffect(() => {
    if (user) {
      resetInfoForm({ username: user.username, email: user.email });
    } else {
      router.push("/auth/login");
    }
  }, [user, resetInfoForm, router]);

  const watchedImage = watch("profileImage");
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      setPreviewImage(URL.createObjectURL(watchedImage[0]));
    }
  }, [watchedImage]);

  const resumeFileName = watchResume("resumeFile")?.[0]?.name;

  // --- Submission Handlers (Now with Toaster and Refetching) ---
  const onInfoUpdate = async (data) => {
    const promise = axios.put("/api/v1/admin/username", data);
    toast.promise(promise, {
      loading: "Updating profile...",
      success: async (res) => {
        await refetchUserData();
        setIsInfoEditable(false); // Refetch after success
        return res.data.message || "Profile updated successfully!";
      },
      error: (err) => err.response?.data?.message || "An error occurred.",
    });
  };

  const onPasswordChange = async (data) => {
    const promise = axios.put("/api/v1/admin/password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    toast.promise(promise, {
      loading: "Changing password...",
      success: (res) => {
        resetPasswordForm();
        setIsPasswordEditable(false);
        return res.data.message || "Password changed successfully!";
      },
      error: (err) => err.response?.data?.message || "An error occurred.",
    });
  };

  const onImageUpdate = async (data) => {
    const formData = new FormData();
    formData.append("profileImage", data.profileImage[0]);

    const promise = axios.post("/api/v1/admin/photo", formData);
    toast.promise(promise, {
      loading: "Uploading photo...",
      success: async (res) => {
        resetImageForm();
        setPreviewImage(null);
        await refetchUserData(); // Refetch after success
        setIsImageEditable(false);
        return res.data.message || "Photo updated successfully!";
      },
      error: (err) => err.response?.data?.message || "An error occurred.",
    });
  };

  const onResumeUpdate = async (data) => {
    const formData = new FormData();
    formData.append("resumeFile", data.resumeFile[0]);

    const promise = axios.post("/api/v1/admin/resume", formData);
    toast.promise(promise, {
      loading: "Uploading resume...",
      success: async (res) => {
        resetResumeForm();
        await refetchUserData(); // Refetch after success
        setIsResumeEditable(false);
        return res.data.message || "Resume uploaded successfully!";
      },
      error: (err) => err.response?.data?.message || "An error occurred.",
    });
  };

  if (!user) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  // --- RENDER ---
  return (
    <Card className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-4 rounded-2xl border border-gray-300 dark:border-white/30 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
          <span
            className={cn(
              "md:w-1/4 bg-clip-text text-transparent text-left font-semibold",
              theme?.isGradient
                ? theme?.primaryGradient
                : "bg-gradient-to-r from-blue-500 to-cyan-500",
            )}
          >
            Manage Your Profile
          </span>
        </CardTitle>
        <CardDescription>
          Update your personal details, password, and profile picture.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-12">
        {/* --- Profile Picture Form --- */}
        <form onSubmit={handleImageSubmit(onImageUpdate)} className="space-y-4">
          <h3
            className={cn(
              "md:w-1/4 bg-clip-text text-lg text-transparent text-left font-semibold",
              theme?.isGradient
                ? theme?.primaryGradient
                : "bg-gradient-to-r from-blue-500 to-cyan-500",
            )}
          >
            Profile Picture
          </h3>
          <div className="flex items-center gap-4">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-10 h-10 md:w-20 md:h-20 rounded-full object-cover"
              />
            ) : user.profileImage?.data ? (
              <img
                src={
                  `data:${user.profileImage.contentType};base64,${Buffer.from(
                    user.profileImage.data,
                  ).toString("base64")}` ?? imageUrl
                }
                alt="Profile"
                className="w-10 h-10 md:w-20 md:h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            )}
            <div>
              <Label htmlFor="profileImage">Select new photo</Label>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                {...registerImage("profileImage")}
                disabled={!isImageEditable}
              />
              {imageErrors.profileImage && (
                <p className="text-red-500 text-xs mt-1">
                  {imageErrors.profileImage.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isImageEditable ? (
              <>
                <Button
                  type="submit"
                  disabled={isImageSubmitting}
                  className={cn(
                    "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                    theme?.isGradient
                      ? theme?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                  )}
                >
                  {isImageSubmitting ? "Uploading..." : "Update Photo"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsImageEditable(false);
                    resetImageForm();
                    setPreviewImage(null);
                  }}
                  className="py-3 px-6 shadow-lg hover:scale-105 hover:shadow-2xl transition text-white bg-gray-950 rounded-full"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => setIsImageEditable(true)}
                className={cn(
                  "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                  theme?.isGradient
                    ? theme?.primaryGradient
                    : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                )}
              >
                Edit Photo
              </Button>
            )}
          </div>
        </form>

        {/* --- Personal Information Form --- */}
        <form onSubmit={handleInfoSubmit(onInfoUpdate)} className="space-y-4">
          <h3
            className={cn(
              "md:w-1/4 bg-clip-text text-lg text-transparent text-left font-semibold",
              theme?.isGradient
                ? theme?.primaryGradient
                : "bg-gradient-to-r from-blue-500 to-cyan-500",
            )}
          >
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...registerInfo("username")}
                disabled={!isInfoEditable}
              />
              {infoErrors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {infoErrors.username.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...registerInfo("email")}
                disabled={!isInfoEditable}
              />
              {infoErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {infoErrors.email.message}
                </p>
              )}
            </div>
          </div>
          {isInfoEditable ? (
            <>
              <Button
                type="submit"
                disabled={isInfoSubmitting}
                className={cn(
                  "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                  theme?.isGradient
                    ? theme?.primaryGradient
                    : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                )}
              >
                {isInfoSubmitting ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                className="ml-4 py-3 px-6 shadow-lg hover:scale-105 hover:shadow-2xl transition text-white bg-gray-950 rounded-full"
                onClick={() => setIsInfoEditable(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => setIsInfoEditable(true)}
              className={cn(
                "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                theme?.isGradient
                  ? theme?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
              )}
            >
              Edit Info
            </Button>
          )}
        </form>

        {/* --- Change Password Form --- */}
        <form
          onSubmit={handlePasswordSubmit(onPasswordChange)}
          className="space-y-4"
        >
          <h3
            className={cn(
              "md:w-1/4 bg-clip-text text-lg text-transparent text-left font-semibold",
              theme?.isGradient
                ? theme?.primaryGradient
                : "bg-gradient-to-r from-blue-500 to-cyan-500",
            )}
          >
            Change Password
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                {...registerPassword("currentPassword")}
                disabled={!isPasswordEditable}
              />
              {passwordErrors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                {...registerPassword("newPassword")}
                disabled={!isPasswordEditable}
              />
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...registerPassword("confirmPassword")}
                disabled={!isPasswordEditable}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          {isPasswordEditable ? (
            <>
              <Button
                type="submit"
                disabled={isPasswordSubmitting}
                className={cn(
                  "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                  theme?.isGradient
                    ? theme?.primaryGradient
                    : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                )}
              >
                {isPasswordSubmitting ? "Saving..." : "Change Password"}
              </Button>
              <Button
                type="button"
                className="ml-4 py-3 px-6 shadow-lg hover:scale-105 hover:shadow-2xl transition text-white bg-gray-950 rounded-full"
                onClick={() => setIsPasswordEditable(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => setIsPasswordEditable(true)}
              className={cn(
                "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                theme?.isGradient
                  ? theme?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
              )}
            >
              Edit Password
            </Button>
          )}
        </form>

        {/* --- Manage Resume Form --- */}
        <form
          onSubmit={handleResumeSubmit(onResumeUpdate)}
          className="space-y-4"
        >
          <h3
            className={cn(
              "md:w-1/4 bg-clip-text text-lg text-transparent text-left font-semibold",
              theme?.isGradient
                ? theme?.primaryGradient
                : "bg-gradient-to-r from-blue-500 to-cyan-500",
            )}
          >
            Manage Resume
          </h3>
          <div className="p-4 border dark:border-white/20 rounded-md space-y-4">
            {user.resume?.filename && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Current Resume:{" "}
                <span className="font-medium">{user.resume.filename}</span>
              </div>
            )}
            <div>
              <Label htmlFor="resumeFile">
                {user.resume?.filename
                  ? "Upload a new Resume"
                  : "Upload a Resume"}{" "}
                (.pdf, .doc, .docx)
              </Label>
              <Input
                id="resumeFile"
                type="file"
                {...registerResume("resumeFile")}
                disabled={!isResumeEditable}
              />
              {resumeFileName && (
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {resumeFileName}
                </p>
              )}
              {resumeErrors.resumeFile && (
                <p className="text-red-500 text-xs mt-1">
                  {resumeErrors.resumeFile.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {isResumeEditable ? (
                <>
                  <Button
                    type="submit"
                    disabled={isResumeSubmitting}
                    className={cn(
                      "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                      theme?.isGradient
                        ? theme?.primaryGradient
                        : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                    )}
                  >
                    {isResumeSubmitting ? "Uploading..." : "Upload Resume"}
                  </Button>
                  <Button
                    type="button"
                    className="py-3 px-6 shadow-lg hover:scale-105 hover:shadow-2xl transition text-white bg-gray-950 rounded-full"
                    onClick={() => {
                      setIsResumeEditable(false);
                      resetResumeForm();
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsResumeEditable(true)}
                  className={cn(
                    "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                    theme?.isGradient
                      ? theme?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                  )}
                >
                  {user.resume?.filename ? "Edit Resume" : "Add Resume"}
                </Button>
              )}
              {user.resume?.filename && user.id && (
                <a
                  href={`/api/v1/admin/${user.id}/res`}
                  download={user.resume.filename}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                      isResumeEditable
                        ? theme?.primaryGradient
                        : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                    )}
                  >
                    Download Resume
                  </Button>
                </a>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
