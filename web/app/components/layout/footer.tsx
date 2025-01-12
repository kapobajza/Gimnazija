import { Link } from "react-router";

import { Address, Email } from "@/components/icons/icons";
import { LocalImage } from "@/components/image/local-image";

const Footer = () => {
  return (
    <footer>
      <div className="py-9">
        <div className="container">
          <div className="gap-10 space-y-5 md:grid md:grid-cols-12 md:items-center md:space-y-0">
            <div className="col-span-3 flex self-center">
              <Link to="/" className="shrink-0">
                <LocalImage
                  src="/logo/circle_logo.png"
                  className="max-w-[150px] lg:max-w-[180px]"
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
                  <a
                    href="mailto:gimnazija_bug@yahoo.com"
                    className="hover:text-primary"
                  >
                    gimnazija_bug@yahoo.com
                  </a>
                </div>
              </div>
            </div>
            <a
              className="col-span-4 block cursor-pointer lg:col-span-3"
              href="https://maps.app.goo.gl/oySPXfXs6SZEy23f9"
              target="_blank"
            >
              <div className="flex space-x-4">
                <Address width="32" height="32" className="h-8 w-8" />
                <address className="-mt-px max-w-[170px] leading-6 md:max-w-[250px]">
                  Zlatnih ljiljana b.b. 70230 Bugojno
                </address>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-12">
        <div className="container text-center">
          <span className="text-xs">
            © {new Date().getFullYear()} MSŠ „Gimnazija Bugojno“
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
