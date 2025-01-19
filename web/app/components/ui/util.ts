import { cva } from "class-variance-authority";

export const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-bold text-foreground dark:text-white dark:focus:text-primary dark:hover:text-primary transition-colors hover:text-primary-50 focus:text-primary-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:text-accent",
);
