import { TeamMember } from '@/routes/nas-tim/data';

export default function StaffCard({ member }: { member: TeamMember }) {
  return (
    <article
      className="shadow-sm dark:shadow-white/5 overflow-hidden rounded-lg bg-white dark:bg-slate-850"
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
      <div className="rounded-b-lg p-6 border-t border-slate-200">
        <h2 className="mb-2 md:text-xl text-lg font-bold">{member.name}</h2>
        {member.title ? <span className="text-sm md:text-md text-primary font-bold">{member.title}</span> : null}
      </div>
    </article>
  );
}
