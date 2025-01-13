import type { Employee, EmployeeGroup } from "@/types/api/employee.types";
import type { ApiResponse } from "@/types/api/response.types";
import { generateImageWithBaseUrl } from "@/lib/image";
import { getEnvKey } from "@/env/get";

import { createApi } from "./api";

export const createEmployeesApi = () => {
  const employeesApi = createApi({
    routePrefix: "employees",
  });

  function getFormattedEmployee(employee: Employee): Employee {
    return {
      ...employee,
      picture: employee.picture
        ? generateImageWithBaseUrl(
            getEnvKey("PUBLIC_GMNZ_API_URL"),
            employee.picture,
          )
        : undefined,
    };
  }

  return {
    async getAll() {
      const { data } = await employeesApi.get<ApiResponse<Employee[]>>("", {
        queryParams: {
          "pagination[limit]": 500,
          "populate[picture][fields][0]": "url",
          "populate[picture][fields][1]": "formats",
          "populate[group][fields][0]": "name",
        },
      });

      return data.data.reduce<
        { group: EmployeeGroup; employees: Employee[] }[]
      >((acc, employee) => {
        const existingGroup = acc.find(
          (group) => group.group.documentId === employee.group.documentId,
        );

        if (existingGroup) {
          existingGroup.employees.push(getFormattedEmployee(employee));
        } else {
          acc.push({
            group: {
              documentId: employee.group.documentId,
              name: employee.group.name,
            },
            employees: [getFormattedEmployee(employee)],
          });
        }

        return acc;
      }, []);
    },
  };
};
