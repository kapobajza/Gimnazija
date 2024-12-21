import { cn } from '@/lib/utils';

type SectionPageTitleProps = {
  children: React.ReactNode;
  subtitle?: string;
  titleClasses?: string;
  subtitleClasses?: string;
  className?: string;
};

const SectionPageTitle = ({ children, subtitle, titleClasses, subtitleClasses, className }: SectionPageTitleProps) => {
  return (
    <section className={cn('bg-muted pb-32 pt-48 dark:bg-slate-900', className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className={cn('mb-6', titleClasses)}>{children}</h1>
          {subtitle ? <p className={cn('text-lg', subtitleClasses)}>{subtitle}</p> : null}
        </div>
      </div>
    </section>
  );
};

export default SectionPageTitle;
