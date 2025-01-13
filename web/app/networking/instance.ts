import { createPostsApi } from "@/networking/posts.api";

import { createEmployeesApi } from "./employees.api";

export const api = {
  postsApi: createPostsApi(),
  employeesApi: createEmployeesApi(),
};
