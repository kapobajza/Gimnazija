import { siteConfig } from '@/config/site';
import { LocalImage } from '@/components/image/local-image';
import { cn } from '@/lib/utils';

type SiteLogoProps = {
  lightClasses?: string;
  darkClasses?: string;
  className?: string;
};

export default function SiteLogo({ lightClasses, darkClasses, className }: SiteLogoProps) {
  return (
    <>
      <LocalImage src="/logo/mssgb_logo_white.png" className={cn(className, lightClasses)} alt={siteConfig.name} />
      <LocalImage src="/logo/mssgb_logo_dark.png" className={cn(className, darkClasses)} alt={siteConfig.name} />
    </>
  );
}
