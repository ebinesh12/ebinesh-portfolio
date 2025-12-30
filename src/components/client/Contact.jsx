"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/services/schema";
import { contactValues } from "@/utils/constant";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  User,
  MessageSquare,
  Type,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

// Helper: Map DB icon strings to Lucide components
const getContactIcon = (iconString) => {
  const s = iconString?.toLowerCase() || "";
  if (s.includes("mail") || s.includes("envelope"))
    return <Mail className="w-6 h-6" />;
  if (s.includes("phone") || s.includes("call"))
    return <Phone className="w-6 h-6" />;
  if (s.includes("map") || s.includes("location") || s.includes("pin"))
    return <MapPin className="w-6 h-6" />;
  if (s.includes("linkedin")) return <Linkedin className="w-6 h-6" />;
  if (s.includes("twitter") || s.includes("x"))
    return <Twitter className="w-6 h-6" />;
  if (s.includes("git")) return <Github className="w-6 h-6" />;
  // Default
  return <MessageSquare className="w-6 h-6" />;
};

const Contact = ({ themes, data }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: contactValues,
  });

  const onSubmit = async (validatedData) => {
    const toastId = toast.loading("Sending your message...");

    try {
      const response = await axios.post("/api/v1/contact", validatedData);

      if (response.data.code === 200) {
        toast.success("Message sent successfully!", { id: toastId });
        reset();
      } else {
        toast.error(response.data.message || "Something went wrong.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to send message. Please try again later.", {
        id: toastId,
      });
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="contact"
      className={cn(
        "relative py-24 overflow-hidden transition-colors duration-700",
        !themes?.isGradient && "bg-gray-50 dark:bg-zinc-950",
        themes?.isGradient && themes?.sectionGradient,
      )}
    >
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-900/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-900/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative container mx-auto px-6 z-10">
        {/* --- Header --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border",
                themes?.isGradient
                  ? "border-white/30 text-white bg-white/10"
                  : "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:bg-blue-900/20",
              )}
            >
              <Send className="w-3 h-3" />
              {data?.superTitle || "Get in Touch"}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {data?.title || "Contact Me"}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {data?.description ||
              "Let's discuss opportunities, collaborations, or just say hello."}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto"
        >
          {/* --- Left Column: Contact Info --- */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3
              className={cn(
                "text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
              )}
            >
              {data?.connect?.title || "Let's Connect"}
            </h3>

            <div className="grid gap-6">
              {data?.connect?.methods?.map((method, index) => {
                const isLink = !!method.href;
                const Tag = isLink ? "a" : "div";

                return (
                  <Tag
                    key={index}
                    href={isLink ? method.href : undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noreferrer" : undefined}
                    className={cn(
                      "flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300",
                      "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md",
                      "border-gray-200 dark:border-white/10 shadow-sm",
                      isLink &&
                        "hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer",
                    )}
                  >
                    <div
                      className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md",
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "bg-gradient-to-br from-blue-500 to-indigo-600",
                      )}
                    >
                      {getContactIcon(method.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                        {method.type}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-0.5 break-all">
                        {method.value}
                      </p>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </motion.div>

          {/* --- Right Column: Contact Form --- */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Send a Message
              </h3>

              <form
                id="contactForm"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Name Input */}
                <div className="relative">
                  <label htmlFor="name" className="sr-only">
                    Your Name
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    {...register("name")}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-300",
                      "bg-gray-50 dark:bg-white/5",
                      "border-gray-200 dark:border-white/10",
                      "text-gray-900 dark:text-white placeholder:text-gray-400",
                      "focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900",
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Your Email
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    {...register("email")}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-300",
                      "bg-gray-50 dark:bg-white/5",
                      "border-gray-200 dark:border-white/10",
                      "text-gray-900 dark:text-white placeholder:text-gray-400",
                      "focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900",
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject Input */}
                <div className="relative">
                  <label htmlFor="subject" className="sr-only">
                    Subject
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Type className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    {...register("subject")}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-300",
                      "bg-gray-50 dark:bg-white/5",
                      "border-gray-200 dark:border-white/10",
                      "text-gray-900 dark:text-white placeholder:text-gray-400",
                      "focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900",
                    )}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div className="relative">
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <div className="absolute top-3 left-4 pointer-events-none text-gray-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Write your message..."
                    {...register("message")}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-300 resize-none",
                      "bg-gray-50 dark:bg-white/5",
                      "border-gray-200 dark:border-white/10",
                      "text-gray-900 dark:text-white placeholder:text-gray-400",
                      "focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900",
                    )}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300",
                    "hover:shadow-xl hover:-translate-y-1 active:scale-95",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
                    isSubmitting && "opacity-70 cursor-not-allowed",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
