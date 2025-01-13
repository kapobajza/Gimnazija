import type { ImageMedia } from "./media.types";

export type EmployeeGroup = {
  name: string;
  documentId: string;
};

export type Employee = {
  documentId: string;
  name: string;
  picture: ImageMedia | undefined;
  title: string;
  group: EmployeeGroup;
};
