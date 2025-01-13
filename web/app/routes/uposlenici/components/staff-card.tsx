import { CircleUserRound, ExpandIcon } from "lucide-react";

import type { Employee } from "@/types/api/employee.types";
import { cn } from "@/lib/utils";

export default function StaffCard({
  member,
  onClick,
}: {
  member: Employee;
  onClick: (employee: Employee) => void;
}) {
  return (
    <article
      className={cn(
        "relative mx-auto w-4/5 overflow-hidden rounded-lg bg-white shadow-sm shadow-slate-500/20 dark:bg-slate-850 dark:shadow-white/5 sm:w-auto md:mx-0",
      )}
      itemType="https://schema.org/Article"
    >
      <div className="h-[420px] lg:h-[453px]">
        {member.picture ? (
          <figure className="relative h-full overflow-hidden">
            <div className="group">
              <img
                src={member.picture.formats.small.url}
                alt={member.name}
                className="h-full w-full transition-transform duration-1600 will-change-transform group-hover:scale-105"
              />
            </div>
            <button
              className="absolute right-5 top-5 z-10 bg-slate-50 p-2 shadow-sm shadow-black/20"
              onClick={() => {
                onClick(member);
              }}
            >
              <ExpandIcon className="fill-muted-foreground" />
              <span className="sr-only">Expand</span>
            </button>
          </figure>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-400 dark:to-slate-500">
            <CircleUserRound
              className="size-20 text-muted-foreground dark:text-slate-100"
              strokeWidth={1.2}
            />
          </div>
        )}
      </div>
      <div className="rounded-b-lg border-t border-slate-200 p-6 dark:border-slate-600">
        <h2 className="mb-2 text-md font-bold sm:text-xl">{member.name}</h2>
        {member.title ? (
          <span className="text-xs font-bold text-primary-50 dark:text-primary sm:text-sm md:text-md">
            {member.title}
          </span>
        ) : null}
      </div>
    </article>
  );
}
