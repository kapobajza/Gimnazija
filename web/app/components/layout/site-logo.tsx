import { siteConfig } from '@/config/site';
import { LocalImage } from '@/components/image/local-image';
import { cn } from '@/lib/utils';

type SiteLogoProps = {
  className?: string;
};

export default function SiteLogo({ className }: SiteLogoProps) {
  return (
    <>
      <LocalImage src="/logo/mssgb_logo_white.png" className={cn(className, 'dark:hidden')} alt={siteConfig.name} />
      <LocalImage
        src="/logo/mssgb_logo_dark.png"
        className={cn(className, 'hidden dark:block')}
        alt={siteConfig.name}
      />
    </>
  );
}
