// 1. Define Zod schemas for validation
import * as z from "zod";

/*------------------- Contact Zod schemas for validation ----------------------------*/

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
});

/*------------------- EditHero Zod schemas for validation ---------------------------*/

const actionSchema = z.object({
  id: z.string().min(1, "Action ID cannot be empty."),
  text: z.string().min(1, "Button text cannot be empty."),
  href: z.string().min(1, "URL/href cannot be empty."),
  icon: z.string().min(1, "Icon class cannot be empty."),
});

const socialLinkSchema = z.object({
  name: z.string().min(1, "Social link name cannot be empty."),
  url: z.string().url("Invalid URL format."),
  color: z.string().min(1, "Color cannot be empty."), 
  show: z.boolean().default(true),
});

export const heroSchema = z.object({
  personalInfo: z.object({
    greeting: z.string().min(1, "Greeting is required."),
    name: z.string().min(1, "Name is required."),
    title: z.string().min(1, "Title is required."),
    availability: z.string().min(1, "Availability is required."),
    photo: z.string().optional(),
  }),
  about: z.object({
    summary: z.string().min(10, "Summary must be at least 10 characters long."),
  }),
  actions: z.array(actionSchema),
  socialLinks: z.array(socialLinkSchema),
});

/*------------------- EditAbout Zod schemas for validation --------------------------*/

const educationSchema = z.object({
  degree: z.string().min(1, "Degree cannot be empty."),
  institution: z.string().min(1, "Institution cannot be empty."),
  duration: z.string().min(1, "Duration cannot be empty."),
  description: z.string().min(1, "Education description cannot be empty."),
});

const storySchema = z.object({
  title: z.string().min(1, "Story title cannot be empty."),
  paragraphs: z
    .array(z.string().min(1, "Paragraph cannot be empty."))
    .min(1, "At least one paragraph is required."),
});

export const aboutSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Section description is required."),
  icon: z.string().min(1, "Icon class cannot be empty."),
  story: storySchema,
  education: z.array(educationSchema),
});

/*------------------- EditSkill Zod schemas for validation --------------------------*/

// 1. Define Zod schemas for validation
const skillItemSchema = z.object({
  name: z.string().min(1, "Skill name is required."),
  level: z.string().min(1, "Skill level is required."),
  icon: z.string().min(1, "Skill icon is required."),
  color: z.string().optional(),
});

const skillCategorySchema = z.object({
  title: z.string().min(1, "Category title cannot be empty."),
  icon: z.string().min(1, "Category icon cannot be empty."),
  items: z
    .array(skillItemSchema)
    .min(1, "Each category must have at least one skill."),
});

export const skillsSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  categories: z.array(skillCategorySchema),
});

/*------------------- EditProject Zod schemas for validation ------------------------*/

const projectItemSchema = z.object({
  title: z.string().min(1, "Project title cannot be empty."),
  description: z.string().min(1, "Project description cannot be empty."),
  icon: z.string().min(1, "Project icon is required."),
  github: z.string().url("Invalid GitHub URL format."),
  demo: z.string().url("Invalid Demo URL format."),
  gradient: z.string().min(1, "Gradient is required."),
});

export const projectsSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  items: z.array(projectItemSchema),
});

/*------------------- EditExperience Zod schemas for validation ---------------------*/

const jobSchema = z.object({
  role: z.string().min(1, "Job role cannot be empty."),
  company: z.string().min(1, "Company name cannot be empty."),
  duration: z.string().min(1, "Job duration is required."),
  responsibilities: z
    .array(z.string().min(1, "Responsibility cannot be empty."))
    .min(1, "At least one responsibility is required."),
});

export const experienceSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  jobs: z.array(jobSchema),
});

/*------------------- EditCertificate Zod schemas for validation ---------------------*/

const certificateItemSchema = z.object({
  title: z.string().min(1, "Certificate title cannot be empty."),
  issuer: z.string().min(1, "Issuer cannot be empty."),
  description: z.string().min(1, "Description cannot be empty."),
  date: z.string().min(1, "Date is required."),
  pdf: z.string().url("Invalid PDF URL format."),
});

export const certificatesSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  items: z.array(certificateItemSchema),
});

/*------------------- EditAchievement Zod schemas for validation ---------------------*/

const achievementItemSchema = z.object({
  icon: z.string().min(1, "Achievement icon is required."),
  title: z.string().min(1, "Achievement title cannot be empty."),
  description: z.string().min(1, "Achievement description cannot be empty."),
});

export const achievementsSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  items: z.array(achievementItemSchema),
});

/*-------------------- EditContact Zod schemas for validation ------------------------*/

const connectMethodSchema = z.object({
  type: z.string().min(1, "Method type cannot be empty."),
  value: z.string().min(1, "Method value cannot be empty."),
  href: z.string().url("Invalid URL/href format."),
  icon: z.string().min(1, "Method icon is required."),
});

export const linksSchema = z.object({
  superTitle: z.string().min(1, "Super Title is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  connect: z.object({
    title: z.string().min(1, "Connect section title is required."),
    methods: z.array(connectMethodSchema),
  }),
});

/*------------------- Register Zod schemas for validation ----------------------------*/

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must be no more than 20 characters long." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),

  profileImage: z
    // .instanceof(FileList)
    .any()
    .optional() // Make the file optional
    .refine((files) => {
      // If no file is selected, refinement passes.
      if (!files || files.length === 0) return true;
      // Check file size
      return files[0].size <= MAX_FILE_SIZE;
    }, `Max file size is 5MB.`)
    .refine((files) => {
      // If no file is selected, refinement passes.
      if (!files || files.length === 0) return true;
      // Check file type
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }, ".jpg, .jpeg, .png and .webp files are accepted."),

    isAdmin: z.boolean().default(false),
});

/*---------------------- Register Zod schemas for validation---------------------*/

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

/*-------------------------------------------------------------------------------*/

export const profileInfoSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Please enter a valid email address."),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // path of error
  });

export const profileImageSchema = z.object({
  profileImage: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Only .jpg, .png, and .webp formats are supported.",
    ),
});

// --- ADD THIS SCHEMA ---
const MAX_FILE_SIZES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const resumeSchema = z.object({
  resumeFile: z
    .any()
    .refine((files) => files?.length == 1, "A file is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZES,
      `Max file size is 10MB.`,
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      ".pdf, .doc, and .docx files are accepted.",
    ),
});
