import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type IconBoxProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  iconBase?: string;
  shadow?: string;
  className?: string;
};

const IconBox = ({ icon, iconBase, title, description, shadow, className }: IconBoxProps) => {
  return (
    <div
      className={cn(
        'relative top-0 z-[1] overflow-hidden rounded-xl bg-white p-10 shadow-sm transition-all duration-200 hover:-top-[.125rem] hover:shadow-lg hover:shadow-slate-500/20 dark:bg-slate-800 dark:hover:shadow-slate-950/40',
        shadow,
        className,
      )}
    >
      {icon ? (
        <div className="relative mb-4 inline-block">
          {icon}
          <span className={cn('absolute -right-4 -top-2 -z-[1] block h-10 w-10 rounded-full', iconBase)}></span>
        </div>
      ) : null}

      {title ? <h3 className="mb-6 text-lg">{title}</h3> : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
};

export default IconBox;
