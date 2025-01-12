import type { TeamMember } from "@/routes/uposlenici/data";

export default function StaffCard({ member }: { member: TeamMember }) {
  return (
    <article
      className="overflow-hidden rounded-lg bg-white shadow-sm shadow-slate-500/20 dark:bg-slate-850 dark:shadow-white/5"
      itemType="https://schema.org/Article"
    >
      <figure className="relative overflow-hidden">
        <div className="group">
          <img
            src={member.image}
            alt={member.name}
            className="transition-transform duration-1600 will-change-transform group-hover:scale-105"
          />
        </div>
      </figure>
      <div className="rounded-b-lg border-t border-slate-200 p-6">
        <h2 className="mb-2 text-lg font-bold md:text-xl">{member.name}</h2>
        {member.title ? (
          <span className="text-sm font-bold text-primary md:text-md">
            {member.title}
          </span>
        ) : null}
      </div>
    </article>
  );
}
