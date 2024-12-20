import * as React from 'react';

type SectionTitleProps = {
  children: React.ReactNode;
  subtitle?: string;
  sectionClasses?: string;
  titleClasses?: string;
  subtitleClasses?: string;
};

const SectionTitle = ({ children, subtitle, sectionClasses, titleClasses, subtitleClasses }: SectionTitleProps) => {
  return (
    <div className={sectionClasses}>
      <h2 className={titleClasses}>{children}</h2>
      {subtitle ? <p className={subtitleClasses}>{subtitle}</p> : null}
    </div>
  );
};

export default SectionTitle;
