"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod"; // Import Zod

// 1. Define the Zod schema for form validation
const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
});

const Contact = ({ themes, data }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // 2. Validate form data with Zod
    const validationResult = contactSchema.safeParse(formData);

    // If validation fails, show errors and stop
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Sending your message...");

    try {
      // 3. Send the validated data to the API
      const response = await axios.post(
        "/api/v1/contact",
        validationResult.data,
      );

      if (response.data.code === 200) {
        toast.success("Message sent successfully!", {
          id: toastId,
        });
        // Clear form fields after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <!-- Contact Section -->
    <section
      id="contact"
      className="py-16
                bg-gradient-to-br from-blue-100 via-white to-cyan-100
                dark:bg-gradient-to-br dark:from-blue-950 dark:via-gray-900 dark:to-black
                transition-colors duration-700"
    >
      <div className="container mx-auto px-4">
        {/* <!-- Section Title --> */}
        <div className="text-center mb-12">
          <p
            className={cn(
              "bg-clip-text text-transparent font-semibold uppercase tracking-widest mb-2",
              themes?.isGradient
                ? themes?.primaryGradient
                : "text-blue-600 dark:text-cyan-400",
            )}
          >
            {data?.superTitle ?? "Get in Touch"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            {data?.title ?? "Contact Me"}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-2 max-w-xl mx-auto">
            {data?.description ??
              "Let's discuss opportunities, collaborations, or any questions you might have"}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* <!-- Contact Info --> */}
          <div>
            <h3
              className={cn(
                "text-2xl font-bold mb-6 bg-clip-text text-transparent",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "text-gray-900 dark:text-white",
              )}
            >
              {data?.connect?.title ?? "Let's Connect"}
            </h3>

            <div className="space-y-8">
              {data?.connect?.methods?.map((method) => {
                const isLink = !!method.href;
                const Tag = isLink ? "a" : "div";

                return (
                  <Tag
                    key={method.type}
                    href={isLink ? method.href : undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 bg-white/40 dark:bg-white/12 backdrop-blur-lg rounded-xl border border-gray-300 dark:border-white/30 shadow hover:shadow-lg transition"
                  >
                    <i
                      className={cn(
                        `${method.icon} text-2xl bg-clip-text text-transparent`,
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "text-indigo-600",
                      )}
                    ></i>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {method.type}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-300">
                        {method.value}
                      </p>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>

          {/* <!-- Contact Form --> */}
          <div>
            <h3
              className={cn(
                "text-2xl font-bold mb-6 bg-clip-text text-transparent",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "text-gray-900 dark:text-white",
              )}
            >
              Send a Message
            </h3>
            <form
              id="contactForm"
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  id="contact-btn"
                  disabled={isLoading}
                  className={cn(
                    "inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-2xl transition transform duration-300",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                    isLoading && "cursor-not-allowed opacity-70",
                  )}
                >
                  <i className="fas fa-paper-plane"></i>
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
