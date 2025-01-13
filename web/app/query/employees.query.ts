import type { FetchQueryOptions } from "@tanstack/react-query";

import { api } from "@/networking/instance";

export const employeesQueryKey = {
  all: ["employees"],
} as const;

export function getAllEmployeesQueryOptions() {
  return {
    queryKey: employeesQueryKey.all,
    queryFn() {
      return api.employeesApi.getAll();
    },
  } satisfies FetchQueryOptions;
}
