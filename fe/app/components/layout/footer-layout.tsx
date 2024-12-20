import { Link } from '@remix-run/react';
import SiteLogo from '@/components/layout/site-logo';
import { Email, Address } from '@/components/icons/icons';

const FooterLayout = () => {
  return (
    <footer>
      <div className="py-9">
        <div className="container">
          <div className="gap-10 space-y-5 md:grid md:grid-cols-12 md:space-y-0 md:items-center">
            <div className="col-span-3 self-center">
              <Link to="/" className="shrink-0">
                <SiteLogo
                  lightClasses="dark:hidden"
                  darkClasses="hidden dark:block"
                  src={{
                    dark: '/logo/mssgb_logo_full_dark.png',
                    light: '/logo/mssgb_logo_full_white.png',
                  }}
                />
              </Link>
            </div>
            <div className="col-span-4 col-start-4 lg:col-span-3 lg:col-start-7">
              <div className="flex space-x-4">
                <Email width="32" height="32" className="h-8 w-8" />
                <div>
                  <a href="tel:+38730260112" className="block text-md">
                    +387 30 260-112
                  </a>
                  <a href="mailto:gimnazija_bug@yahoo.com" className="hover:text-primary">
                    gimnazija_bug@yahoo.com
                  </a>
                </div>
              </div>
            </div>
            <a
              className="col-span-4 lg:col-span-3 cursor-pointer"
              href="https://maps.app.goo.gl/oySPXfXs6SZEy23f9"
              target="_blank"
            >
              <div className="flex space-x-4">
                <Address width="32" height="32" className="h-8 w-8" />
                <address className="-mt-px leading-6 max-w-[250px]">Zlatnih ljiljana b.b. 70230 Bugojno</address>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-12">
        <div className="container text-center">
          <span className="text-xs">© {new Date().getFullYear()} Mješovita srednja škola gimnazija Bugojno</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
