"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/v1/logout", {
        method: "POST",
      });

      if (res.ok) {
        // Redirect to the login page and refresh to clear any client-side state
        router.push("/auth/login");
        router.refresh();
      } else {
        console.error("Logout failed");
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
