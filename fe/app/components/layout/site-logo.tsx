import { siteConfig } from '@/config/site';
import { LocalImage } from '@/components/image/local-image';
import { cn } from '@/lib/utils';

type SiteLogoProps = {
  lightClasses?: string;
  darkClasses?: string;
  className?: string;
  src: {
    light: string;
    dark: string;
  };
};

export default function SiteLogo({ lightClasses, darkClasses, className, src }: SiteLogoProps) {
  return (
    <>
      <LocalImage src={src.light} className={cn(className, lightClasses)} alt={siteConfig.name} />
      <LocalImage src={src.dark} className={cn(className, darkClasses)} alt={siteConfig.name} />
    </>
  );
}
