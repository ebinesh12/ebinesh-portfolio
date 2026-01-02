"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import { useTheme } from "@/providers/ThemeProvider";

// Schemas
import {
  profileInfoSchema,
  passwordChangeSchema,
  profileImageSchema,
  resumeSchema,
} from "@/services/schema";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Icons
import {
  User,
  Mail,
  Lock,
  Camera,
  FileText,
  Download,
  Upload,
  Save,
  X,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);

  // State
  const [previewImage, setPreviewImage] = useState(null);
  const [isInfoEditable, setIsInfoEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [isResumeEditable, setIsResumeEditable] = useState(false);

  // --- 1. Data Refreshing ---
  const refetchUserData = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/detail");
      dispatch(setUser(data.user));
    } catch (error) {
      console.error("Refetch error:", error);
    }
  };

  // --- 2. Form Setup ---

  // A. Info Form
  const {
    register: registerInfo,
    handleSubmit: handleInfoSubmit,
    formState: { errors: infoErrors, isSubmitting: isInfoSubmitting },
    reset: resetInfoForm,
  } = useForm({ resolver: zodResolver(profileInfoSchema) });

  // B. Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPasswordForm,
  } = useForm({ resolver: zodResolver(passwordChangeSchema) });

  // C. Image Form
  const {
    register: registerImage,
    handleSubmit: handleImageSubmit,
    watch: watchImage,
    reset: resetImageForm,
  } = useForm({ resolver: zodResolver(profileImageSchema) });

  // D. Resume Form
  const {
    register: registerResume,
    handleSubmit: handleResumeSubmit,
    formState: { errors: resumeErrors, isSubmitting: isResumeSubmitting },
    reset: resetResumeForm,
    watch: watchResume,
  } = useForm({ resolver: zodResolver(resumeSchema) });

  // --- 3. Effects ---
  useEffect(() => {
    if (user) {
      resetInfoForm({ username: user.username, email: user.email });
    } else {
      router.push("/auth/login");
    }
  }, [user, resetInfoForm, router]);

  // Watch for image changes to trigger auto-submit or preview
  const watchedImage = watchImage("profileImage");
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      setPreviewImage(URL.createObjectURL(file));
      // Auto-submit image when selected
      handleImageSubmit(onImageUpdate)();
    }
  }, [watchedImage]);

  const resumeFileName = watchResume("resumeFile")?.[0]?.name;
  const imageUrl = user?.id ? `/api/v1/admin/${user.id}/img` : null;

  // --- 4. Handlers ---

  const onInfoUpdate = async (data) => {
    const promise = axios.put("/api/v1/admin/username", data);
    toast.promise(promise, {
      loading: "Updating profile...",
      success: async (res) => {
        await refetchUserData();
        setIsInfoEditable(false);
        return res.data.message || "Profile updated!";
      },
      error: (err) => err.response?.data?.message || "Error updating profile.",
    });
  };

  const onPasswordChange = async (data) => {
    const promise = axios.put("/api/v1/admin/password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    toast.promise(promise, {
      loading: "Updating security...",
      success: (res) => {
        resetPasswordForm();
        setIsPasswordEditable(false);
        return res.data.message || "Password changed!";
      },
      error: (err) => err.response?.data?.message || "Error changing password.",
    });
  };

  const onImageUpdate = async (data) => {
    const formData = new FormData();
    formData.append("profileImage", data.profileImage[0]);

    const promise = axios.post("/api/v1/admin/photo", formData);
    toast.promise(promise, {
      loading: "Uploading new avatar...",
      success: async (res) => {
        await refetchUserData();
        setPreviewImage(null);
        return "Avatar updated!";
      },
      error: "Failed to upload image.",
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
        await refetchUserData();
        setIsResumeEditable(false);
        return "Resume uploaded!";
      },
      error: "Failed to upload resume.",
    });
  };

  if (!user)
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );

  // --- 5. Render ---
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* === LEFT COLUMN: Identity === */}
      <div className="space-y-6 lg:col-span-1">
        {/* Profile Card */}
        <Card className="overflow-hidden border-neutral-200 bg-white/50 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
          <div
            className={cn(
              "h-32 w-full opacity-80",
              theme?.primaryGradient || "bg-neutral-200 dark:bg-neutral-800",
            )}
          ></div>
          <CardContent className="relative px-6 pb-6 text-center">
            {/* Avatar Uploader */}
            <div className="relative mx-auto -mt-16 mb-4 h-32 w-32">
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-neutral-900">
                <img
                  src={previewImage || imageUrl || "/images/profile.jpg"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Invisible File Input Wrapper */}
              <label
                htmlFor="image-upload"
                className={cn(
                  "absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-110",
                  theme?.primaryGradient || "bg-blue-600",
                )}
              >
                <Camera className="h-5 w-5" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...registerImage("profileImage")}
                />
              </label>
            </div>

            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {user.username}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {user.email}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Separator />
              <div className="flex items-center justify-between text-sm text-neutral-500">
                <span>Role</span>
                <span className="flex items-center gap-1 font-medium text-neutral-900 dark:text-white">
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                  Administrator
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info Form */}
        <Card className="border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-neutral-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Personal Details</CardTitle>
            <CardDescription>
              Manage your display name and email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleInfoSubmit(onInfoUpdate)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <Input
                    id="username"
                    className="pl-9"
                    {...registerInfo("username")}
                    disabled={!isInfoEditable}
                  />
                </div>
                {infoErrors.username && (
                  <p className="text-xs text-red-500">
                    {infoErrors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    {...registerInfo("email")}
                    disabled={!isInfoEditable}
                  />
                </div>
                {infoErrors.email && (
                  <p className="text-xs text-red-500">
                    {infoErrors.email.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-2">
                {isInfoEditable ? (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsInfoEditable(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isInfoSubmitting}
                      className={cn(theme?.primaryGradient)}
                    >
                      {isInfoSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsInfoEditable(true)}
                  >
                    Edit Details
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* === RIGHT COLUMN: Security & Assets === */}
      <div className="space-y-6 lg:col-span-2">
        {/* Resume Management */}
        <Card className="border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-neutral-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-blue-500" />
              Resume / CV
            </CardTitle>
            <CardDescription>
              Manage your public facing resume file.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Current File Display */}
            <div className="mb-6 flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {user.resume?.filename || "No resume uploaded"}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {user.resume?.contentType || "PDF / DOCX"}
                  </p>
                </div>
              </div>
              {user.resume?.filename && (
                <a
                  href={`/api/v1/admin/${user.id}/res`}
                  download={user.resume.filename}
                >
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4 text-neutral-500 hover:text-neutral-900 dark:hover:text-white" />
                  </Button>
                </a>
              )}
            </div>

            {/* Upload Form */}
            <form onSubmit={handleResumeSubmit(onResumeUpdate)}>
              {isResumeEditable ? (
                <div className="space-y-4 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-900">
                  <div className="text-center">
                    <Label htmlFor="resumeFile" className="cursor-pointer">
                      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                        Click to select file
                      </span>
                      <span className="text-sm text-neutral-500">
                        {" "}
                        or drag and drop
                      </span>
                    </Label>
                    <Input
                      id="resumeFile"
                      type="file"
                      className="hidden"
                      {...registerResume("resumeFile")}
                    />
                    {resumeFileName && (
                      <p className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">
                        {resumeFileName}
                      </p>
                    )}
                    {resumeErrors.resumeFile && (
                      <p className="mt-1 text-xs text-red-500">
                        {resumeErrors.resumeFile.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsResumeEditable(false);
                        resetResumeForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isResumeSubmitting}
                      className={cn(theme?.primaryGradient)}
                    >
                      {isResumeSubmitting ? "Uploading..." : "Upload New File"}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsResumeEditable(true)}
                >
                  Update Resume
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Security / Password */}
        <Card className="border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-neutral-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5 text-orange-500" />
              Security
            </CardTitle>
            <CardDescription>
              Update your password to keep your account safe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPasswordEditable ? (
              <form
                onSubmit={handlePasswordSubmit(onPasswordChange)}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      {...registerPassword("currentPassword")}
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-xs text-red-500">
                        {passwordErrors.currentPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      {...registerPassword("newPassword")}
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-xs text-red-500">
                        {passwordErrors.newPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    {...registerPassword("confirmPassword")}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsPasswordEditable(false);
                      resetPasswordForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isPasswordSubmitting}
                    className={cn(theme?.primaryGradient)}
                  >
                    {isPasswordSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    Password
                  </p>
                  <p className="text-xs text-neutral-500">
                    Last changed: Never
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPasswordEditable(true)}
                >
                  Change Password
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
