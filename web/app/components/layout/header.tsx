import { useState, useEffect } from 'react';
import SiteLogo from '@/components/layout/site-logo';
import MainNav from '@/components/layout/main-nav';
import { mainNav } from '@/config/site';
import { cn, isBrowser } from '@/lib/utils';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Link } from 'react-router';
import { DarkModeSwitch } from '@/components/dark-mode-switch';

function shouldSetStickyHeader() {
  if (!isBrowser()) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const windowHeight = window?.scrollY as number | undefined;
  return windowHeight !== undefined && windowHeight > 0;
}

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    stickyHeader();
    window.addEventListener('scroll', stickyHeader);

    return () => {
      window.removeEventListener('scroll', stickyHeader);
    };
  }, []);

  const stickyHeader = () => {
    setIsSticky(shouldSetStickyHeader());
  };

  return (
    <header className="fixed top-0 z-20 w-full">
      <div
        className={cn(
          'flex items-center px-4 py-5 transition-all xl:px-20 lg:py-7',
          isSticky && 'bg-white dark:bg-slate-900 lg:py-3 py-3',
        )}
      >
        <Link to="/" className="mr-12 shrink-0">
          <SiteLogo className={'w-[70px] lg:w-[90px]'} />
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
