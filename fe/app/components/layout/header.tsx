import { useState, useEffect } from 'react';
import SiteLogo from '@/components/layout/site-logo';
import MainNav from '@/components/layout/main-nav';
import { mainNav } from '@/config/site';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Link } from '@remix-run/react';
import { DarkModeSwitch } from '@/components/dark-mode-switch';

const Header = () => {
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', stickyHeader);

    return () => {
      window.removeEventListener('scroll', stickyHeader);
    };
  }, []);

  const stickyHeader = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const windowHeight = window?.scrollY as number | undefined;
    setIsSticky(windowHeight !== undefined && windowHeight > 0);
  };

  return (
    <header className="fixed top-0 z-20 w-full">
      <div
        className={cn(
          'flex items-center px-4 py-5 transition-all xl:px-20',
          isSticky && 'bg-white dark:bg-slate-900 lg:py-3 py-3',
        )}
      >
        <Link to="/" className="mr-12 shrink-0">
          <SiteLogo lightClasses="dark:hidden" darkClasses="hidden dark:block" className={'w-[80px] lg:w-[120px]'} />
        </Link>

        <div className="relative flex w-full items-center justify-end lg:bg-transparent">
          <MainNav items={mainNav} />
          <DarkModeSwitch className="mr-3" />
          <MobileNav mainNavItems={mainNav} triggerIcon="style-2" />
        </div>
      </div>
    </header>
  );
};

export default Header;
