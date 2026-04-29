import { mockCurrentUser } from "../mocks/user";
import type { User } from "../types/user";

export const userService = {
  async getCurrentUser(): Promise<User> {
    return Promise.resolve(mockCurrentUser);
  },
};
