import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the store
export const useUserStore = create(
  persist(
    (set) => ({
      // Initial state
      user: null,

      // Action to set the user on login
      loginUser: (userData) => set({ user: userData }),

      // Action to clear the user on logout
      logoutUser: () => set({ user: null }),
    }),
    {
      name: "user-session",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
