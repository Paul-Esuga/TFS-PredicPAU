import type { User } from "../types/user";
import { apiFetch } from "./apiClient";

export const userService = {
  async getCurrentUser(): Promise<User> {
    return apiFetch<User>("/api/users/me");
  },
};
